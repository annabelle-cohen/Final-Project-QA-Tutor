package acs.boundaries;

import acs.data.UserRole;

public class UserBoundary {
	private String email;
	private String username;
	private String avatar;
	private UserRole roleEnum;



	public UserBoundary(String email, String username, String avatar, UserRole roleEnum) {
		super();
		this.email = email;
		this.username = username;
		this.avatar = avatar;
		this.roleEnum = roleEnum;
	}


	public UserBoundary() { 
	  }
	 
	
	public String getEmail() {
		return email;
	}

	public String getAvatar() {
		return avatar;
	}

	public UserRole getRoleEnum() {
		return roleEnum;
	}

	public void setRoleEnum(UserRole roleEnum) {
		this.roleEnum = roleEnum;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setUserName(String username) {
		this.username = username;
	}
	
	
	  public String getUsername() {
		return username;
	}


	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}
	

}
