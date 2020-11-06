package acs.data;

import java.util.Map;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import acs.boundaries.ElementBoundary;

@Component
public class ElementConverter {

	private ObjectMapper jackson;

	@PostConstruct
	public void setUp() {
		this.jackson = new ObjectMapper();
	}

	public ElementBoundary convertFromEntity(ElementEntity entity) {
		ElementBoundary elementBound = new ElementBoundary();
		elementBound.setType(entity.getType());
		elementBound.setName(entity.getName());
		elementBound.setLocation(entity.getLocation());
		if (entity.getElementId() != null) {
			elementBound.setElementId("" + entity.getElementId());
		} else {
			elementBound.setElementId(null);
		}
		elementBound.setCreatedTimestamp(entity.getCreatedTimestamp());
		elementBound.setCreatedby(entity.getCreatedby());
		elementBound.setActive(entity.isActive());

		try {
			@SuppressWarnings("unchecked")
			Map<String, Object> readValue = (Map<String, Object>) this.jackson.readValue(entity.getElementAttributes(), // JSON
					Map.class);

			elementBound.setElementAttributes(readValue);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

		return elementBound;
	}

	public ElementEntity toEntity(ElementBoundary boundary) {

		ElementEntity entity = new ElementEntity();
		if (boundary.getElementId() != null) {
			entity.setElementId(Long.parseLong(boundary.getElementId()));
		} else {
			entity.setElementId(null);
		}
		entity.setCreatedTimestamp(boundary.getCreatedTimestamp());

		if (boundary.getType() != null) {
			entity.setType(boundary.getType());
		}

		if (boundary.getName() != null) {
			entity.setName(boundary.getName());
		}

		if (boundary.getLocation() != null) {
			entity.setLocation(boundary.getLocation());
		}

		if (boundary.getCreatedby() != null) {
			entity.setCreatedby(boundary.getCreatedby());
		}

		if (boundary.isActive() != null) {
			entity.setActive(boundary.isActive());
		}

		// marshalling
		try {
			entity.setElementAttributes(this.jackson.writeValueAsString(boundary.getElementAttributes()));
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

		return entity;

	}

	public Long toEntityId(String id) {
		if (id != null) {
			return Long.parseLong(id);
		} else {
			return null;
		}
	}

	public String fromEntityId(Long id) {
		if (id != null) {
			return id.toString();
		} else {
			return null;
		}
	}

	public ElementBoundary convertFromEntity(Optional<ElementEntity> elementEntity) {
		return convertFromEntity(elementEntity);
	}

}
