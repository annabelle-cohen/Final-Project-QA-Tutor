//package acs.data;
//
//import java.util.Date;
//
//import javax.persistence.Embedded;
//import javax.persistence.Entity;
////import javax.persistence.Id;
//import javax.persistence.Lob;
//import javax.persistence.Table;
//import javax.persistence.Temporal;
//import javax.persistence.TemporalType;
//
//import org.springframework.data.annotation.Id;
//
//@Entity
//@Table(name="ACTIONS")
//public class ActionEntity {
//	
//	@Id
//	private Long actionId;
//	private String type;
//	private ActionElement element;
//	private Date createdTimestamp;
//	private InvokedBy invokedBy;
//	private String actionAttributes;
//	
//	public ActionEntity() {
//		super();
//	}
//	
//	@Id
//	public Long getActionId() {
//		return actionId;
//	}
//
//	public void setActionId(Long actionId) {
//		this.actionId = actionId;
//	}
//
//	public String getType() {
//		return type;
//	}
//
//	public void setType(String type) {
//		this.type = type;
//	}
//	
//	@Embedded
//	public ActionElement getElement() {
//		return element;
//	}
//
//	public void setElement(ActionElement element) {
//		this.element = element;
//	}
//	
//	@Temporal(TemporalType.TIMESTAMP)
//	public Date getCreatedTimestamp() {
//		return createdTimestamp;
//	}
//
//	public void setCreatedTimestamp(Date createdTimestamp) {
//		this.createdTimestamp = createdTimestamp;
//	}
//	
//	@Embedded
//	public InvokedBy getInvokedBy() {
//		return invokedBy;
//	}
//
//	public void setInvokedBy(InvokedBy invokedBy) {
//		this.invokedBy = invokedBy;
//	}
//	
//	@Lob
//	public String getActionAttributes() {
//		return actionAttributes;
//	}
//
//	public void setActionAttributes(String actionAttributes) {
//		this.actionAttributes = actionAttributes;
//	}
//
//
//	
//}
