package acs.data;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import javax.persistence.Lob;
import javax.persistence.Table;

import org.springframework.data.annotation.Id;


@Entity
@Table(name = "USERS")
public class UserEntity {
	@Id
	private String email;
	private UserName username;
	private String avatar;
	private UserRole roleEnum;

	public UserEntity() {
		super();
	}

	@Id
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	@Embedded
	public UserName getUsername() {
		return username;
	}

	public void setUsername(UserName username) {
		this.username = username;
	}
	
	@Lob
	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	@Enumerated(EnumType.STRING)
	public UserRole getRoleEnum() {
		return roleEnum;
	}

	public void setRoleEnum(UserRole roleEnum) {
		this.roleEnum = roleEnum;
	}

}
