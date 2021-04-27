
package acs.boundaries;

public class StudentBoundary {

	private String email;
	private UserBoundary student;

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

}
