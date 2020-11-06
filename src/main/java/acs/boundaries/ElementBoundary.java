package acs.boundaries;

import java.util.Date;
import java.util.Map;

import acs.data.Location;
import acs.data.CreatedBy;

public class ElementBoundary {

	private String elementId;
	private String type;
	private String name;
	private Boolean active;
	private Date createdTimestamp;
	private CreatedBy createdby;
	private Location location;
	private Map<String, Object> elementAttributes;

	public ElementBoundary() {

	}


	public ElementBoundary(String elementId, String type, String name, Boolean active, Date createdTimestamp,
			CreatedBy createdby, Location location, Map<String, Object> elementAttributes) {
		super();
		this.elementId = elementId;
		this.type = type;
		this.name = name;
		this.active = active;
		this.createdTimestamp = createdTimestamp;
		this.createdby = createdby;
		this.location = location;
		this.elementAttributes = elementAttributes;
	}


	public Map<String, Object> getElementAttributes() {
		return elementAttributes;
	}

	public void setElementAttributes(Map<String, Object> elementAttributes) {
		this.elementAttributes = elementAttributes;
	}

	public String getElementId() {
		return elementId;
	}

	public void setElementId(String elementId) {
		this.elementId = elementId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean isActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public Date getCreatedTimestamp() {
		return createdTimestamp;
	}

	public void setCreatedTimestamp(Date createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}

	public CreatedBy getCreatedby() {
		return createdby;
	}

	public void setCreatedby(CreatedBy createdby) {
		this.createdby = createdby;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

}
