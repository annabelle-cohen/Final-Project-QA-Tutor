package acs.dal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
//import javax.persistence.Id;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;




@Entity
@Document(collection = "lastValue")
public class LastValue {

	@Id
	private String id;
	private Long lastValue;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	

	public LastValue() {
	}
	
	@GeneratedValue
	public Long getLastValue() {
		return lastValue;
	}

	public void setLastValue(Long lastValue) {
		this.lastValue = lastValue;
	}

}
