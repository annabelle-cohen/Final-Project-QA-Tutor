
package acs.boundaries;

import java.util.List;

public class StudentBoundary {

	private String email;
	private UserBoundary student;
	private String managerEmail;

	private List<BugBoundary> bugs;

	public StudentBoundary() {
		super();
	}

	public StudentBoundary(String email, UserBoundary student) {
		super();
		this.email = email;
		this.student = student;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public UserBoundary getStudent() {
		return student;
	}

	public void setStudent(UserBoundary student) {
		this.student = student;
	}

	public String getManagerEmail() {
		return managerEmail;
	}

	public void setManagerEmail(String managerEmail) {
		this.managerEmail = managerEmail;
	}

	public List<BugBoundary> getBugs() {
		return bugs;
	}

	public void setBugs(List<BugBoundary> bugs) {
		this.bugs = bugs;
	}

}
