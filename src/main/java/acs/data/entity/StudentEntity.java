
package acs.data.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
public class StudentEntity {
	@Id
	@Column(name = "email")
	private String email;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_email", referencedColumnName = "email", foreignKey = @ForeignKey(name = "fk_student_email"))
	private UserEntity user;

	private String managerEmail;

	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	private List<BugEntity> bugs = new ArrayList<BugEntity>();

	public StudentEntity() {
		super();
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public String getManagerEmail() {
		return managerEmail;
	}

	public void setManagerEmail(String managerEmail) {
		this.managerEmail = managerEmail;
	}

	public List<BugEntity> getBugs() {
		return bugs;
	}

	public void setBugs(List<BugEntity> bugs) {
		this.bugs = bugs;
	}

	public void addBug(BugEntity bug) {
		if (!this.bugs.contains(bug))
			this.bugs.add(bug);
	}

}
