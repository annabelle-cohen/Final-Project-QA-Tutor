package acs.logic;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
import acs.data.ElementEntity;
import acs.data.CreatedBy;
import acs.data.ElementConverter;
import acs.boundaries.ElementBoundary;

//@Service
public class ElementServiceMockup implements ElementService {
	private Map<Long, ElementEntity> database;
	private ElementConverter entityConverter;
	private AtomicLong nextElementId;

	public ElementServiceMockup() {

	}

	@PostConstruct
	public void init() {

		this.database = Collections.synchronizedMap(new TreeMap<>());
		this.nextElementId = new AtomicLong(0L);
	}

	@Autowired
	public void setEntityConverter(ElementConverter entityConverter) {
		this.entityConverter = entityConverter;
	}

	@Override
	public ElementBoundary create(String managerEmail, ElementBoundary element) {

		if (managerEmail != null) {
			Long newId = nextElementId.incrementAndGet();

			element.setCreatedTimestamp(new Date());
			element.setElementId(this.entityConverter.fromEntityId(newId));

			ElementEntity entity = this.entityConverter.toEntity(element);

			CreatedBy createdby = new CreatedBy();
			createdby.setEmail(managerEmail);
			entity.setCreatedby(createdby);

			this.database.put(newId, entity);

			return this.entityConverter.convertFromEntity(entity);
		} else {
			throw new UserNotFoundException("managerEmail is null");
		}
	}

	@Override
	public ElementBoundary update(String managerEmail, String elementId, ElementBoundary update) {

		ElementBoundary existing = this.getSpecificElement(managerEmail, elementId);

		if (existing == null) {
			throw new ElementNotFoundException("could not find element for id: " + elementId);
		}

		boolean dirty = false;

		if (update.getType() != null) {
			existing.setType(update.getType());
			dirty = true;
		}

		if (update.getName() != null) {
			existing.setName(update.getName());
			dirty = true;
		}

		if (update.getLocation() != null) {
			existing.setLocation(update.getLocation());
			dirty = true;
		}

		if (update.getElementAttributes() != null) {
			existing.setElementAttributes(update.getElementAttributes());
			dirty = true;
		}

		if (update.isActive() != existing.isActive()) {
			existing.setActive(update.isActive());
			dirty = true;
		}

		if (dirty) {
			this.database.put(this.entityConverter.toEntityId(elementId), this.entityConverter.toEntity(existing));
		}

		return existing;
	}

	@Override
	public List<ElementBoundary> getAll(String userEmail) {

		return this.database.values().stream().map(entity -> this.entityConverter.convertFromEntity(entity))
				.collect(Collectors.toList());
	}

	@Override
	public ElementBoundary getSpecificElement(String userEmail, String elementId) {

		if (userEmail != null) {
			ElementEntity entity = this.database.get(this.entityConverter.toEntityId(elementId));

			if (entity != null) {
				return this.entityConverter.convertFromEntity(entity);
			} else {
				throw new ElementNotFoundException("could not find element for id: " + elementId);
			}
		} else
			throw new ElementNotFoundException("could not find element for email");
	}

	@Override
	public void deleteAllElements(String adminEmail) {

		this.database.clear();

	}

}
