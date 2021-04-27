package acs.boundaries;

public class ManagerBoundary {

	private String email;
	private UserBoundary manager;

	public ManagerBoundary() {
		super();
	}

	public ManagerBoundary(String email, UserBoundary manager) {
		super();
		this.email = email;
		this.manager = manager;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public UserBoundary getManager() {
		return manager;
	}

	public void setManager(UserBoundary manager) {
		this.manager = manager;
	}

}
