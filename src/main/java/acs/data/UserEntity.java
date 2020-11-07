package acs.data;

import javax.persistence.*;



import java.io.Serializable;
@Entity
public class UserEntity implements Serializable {
	@Id
	private String email;
	private UserName username;
	private String avatar;
	private UserRole roleEnum;

	public UserEntity() {
		super();
	}

	@javax.persistence.Id
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
