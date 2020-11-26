package acs.data.entity;

import javax.persistence.*;

@Entity
@Table(name = "user")
public class UserEntity  {
	@Id
	@Column(name = "email")
	private String email; 
	private String password;
	
	@OneToOne(mappedBy = "user")
	private PersonalInfoEntity personalInfo; 
	public UserEntity() {
		super();
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public PersonalInfoEntity getPersonalInfo() {
		return personalInfo;
	}
	public void setPersonalInfo(PersonalInfoEntity personalInfo) {
		this.personalInfo = personalInfo;
	}



}
