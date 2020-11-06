package acs.boundaries;

import java.util.Date;

import java.util.Map;

import acs.data.ActionElement;
import acs.data.InvokedBy;
/// TODO : test this 
public class ActionBoundary {
	private String actionId;
	private String type;
	private ActionElement element;
	private Date createdTimestamp;
	private InvokedBy invokedBy;
	public ActionBoundary(String actionId, String type, ActionElement element, Date createdTimestamp,
			InvokedBy invokedBy, Map<String, Object> actionAttributes) {
		super();
		this.actionId = actionId;
		this.type = type;
		this.element = element;
		this.createdTimestamp = createdTimestamp;
		this.invokedBy = invokedBy;
		this.actionAttributes = actionAttributes;
	}

	private Map<String, Object> actionAttributes;

	public ActionBoundary() {
	}

	public String getActionId() {
		return actionId;
	}

	public void setActionId(String actionId) {
		this.actionId = actionId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public ActionElement getElement() {
		return element;
	}

	public void setElement(ActionElement element) {
		this.element = element;
	}

	public Date getCreatedTimestamp() {
		return createdTimestamp;
	}

	public void setCreatedTimestamp(Date createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}

	public InvokedBy getInvokedBy() {
		return invokedBy;
	}

	public void setInvokedBy(InvokedBy invokedBy) {
		this.invokedBy = invokedBy;
	}

	public Map<String, Object> getActionAttributes() {
		return actionAttributes;
	}

	public void setActionAttributes(Map<String, Object> actionAttributes) {
		this.actionAttributes = actionAttributes;
	}

	

}
