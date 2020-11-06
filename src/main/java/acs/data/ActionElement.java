package acs.data;

import javax.persistence.Embeddable;

@Embeddable
public class ActionElement {

	private String elementId;

	public ActionElement(String elementId) {
		super();
		this.elementId = elementId;
	}

	public ActionElement() {

	}

	public String getElementId() {
		return elementId;
	}

	public void setElementId(String elementId) {
		this.elementId = elementId;
	}
}
