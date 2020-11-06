package acs.data;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
//import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.JoinColumn;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;


@Entity
@Table(name = "ELEMENTS")

public class ElementEntity {
	@Id
	private Long elementId;
	private String type;
	private String name;
	private Boolean active;
	private Date createdTimestamp;
	private CreatedBy createdby;
	private Location location;
	private String elementAttributes;

	
	@DBRef(lazy = true)
	private Set<ElementEntity> parents;
	
	@DBRef(lazy = true)
	private Set<ElementEntity> children;

	public ElementEntity(){
		this.children = new HashSet<>();
		this.parents = new HashSet<>();
	}
	
	@Id
	public Long getElementId() {
		return elementId;
	}
	public void setElementId(Long elementId) {
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
	
	@Temporal(TemporalType.TIMESTAMP)
	public Date getCreatedTimestamp() {
		return createdTimestamp;
	}
	public void setCreatedTimestamp(Date createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}
	
	@Embedded
	public CreatedBy getCreatedby() {
		return createdby;
	}
	public void setCreatedby(CreatedBy createdby) {
		this.createdby = createdby;
	}
	
	@Embedded
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	@Lob
	public String getElementAttributes() {
		return elementAttributes;
	}
	public void setElementAttributes(String elementAttributes) {
		this.elementAttributes = elementAttributes;
	}
	
	@ManyToMany(mappedBy="children",fetch=FetchType.LAZY)
	public Set<ElementEntity> getParents() {
		return parents;
	}

	 
	public void setParents(Set<ElementEntity> parents) {
		this.parents= parents;
	}

	public void addParent(ElementEntity parent) {
		this.parents.add(parent);
	}
	
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(
			name= "Elements_Parents",
			joinColumns= {@JoinColumn(name = "parentId")},
			inverseJoinColumns= {@JoinColumn(name = "childId")}
			)
	public Set<ElementEntity> getChildren() {
		return children;
	}

	public void setChildren(Set<ElementEntity> children) {
		this.children = children;
	}
	
	public void addChild(ElementEntity child) {
		this.children.add(child);
		child.addParent(this);
		
		int val =this.children.size();
		int val2 = child.getParents().size();
		System.out.println(val);
		System.out.println(val2);
	}

}
