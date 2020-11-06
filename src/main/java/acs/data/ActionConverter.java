package acs.data;

import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import acs.boundaries.ActionBoundary;

@Component
public class ActionConverter {

	private ObjectMapper jackson;

	@PostConstruct
	public void setUp() {
		this.jackson = new ObjectMapper();
	}

	public ActionBoundary convertFromEntity(ActionEntity entity) {

		ActionBoundary actionBound = new ActionBoundary();
		actionBound.setActionId(this.fromEntityId(entity.getActionId()));
		actionBound.setType(entity.getType());
		actionBound.setElement(entity.getElement());
		actionBound.setCreatedTimestamp(entity.getCreatedTimestamp());
		actionBound.setInvokedBy(entity.getInvokedBy());

		try {
			@SuppressWarnings("unchecked")
			Map<String, Object> readValue = (Map<String, Object>) this.jackson.readValue(entity.getActionAttributes(), // JSON
					Map.class);

			actionBound.setActionAttributes(readValue);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

		return actionBound;
	}

	public ActionEntity toEntity(ActionBoundary boundary) {

		ActionEntity actionEntity = new ActionEntity();

		if (boundary.getActionId() != null) {
			actionEntity.setActionId(this.toEntityId(boundary.getActionId()));
		}

		if (boundary.getType() != null) {
			actionEntity.setType(boundary.getType());
		}
		if (boundary.getElement() != null) {
			actionEntity.setElement(boundary.getElement());
		}
		if (boundary.getCreatedTimestamp() != null) {
			actionEntity.setCreatedTimestamp(boundary.getCreatedTimestamp());
		}
		if (boundary.getInvokedBy() != null) {
				actionEntity.setInvokedBy(boundary.getInvokedBy());			
		}

		try {
			actionEntity.setActionAttributes(this.jackson.writeValueAsString(boundary.getActionAttributes()));
		} catch (Exception e) {

			throw new RuntimeException(e);
		}

		return actionEntity;
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
}