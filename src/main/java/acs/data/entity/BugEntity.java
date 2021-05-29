package acs.data.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Bug")
public class BugEntity {
	@Id
	@Column(name = "bugName")
	private String bugName;

	private String description;

	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(name = "bug_student", joinColumns = @JoinColumn(name = "bugName"), inverseJoinColumns = @JoinColumn(name = "student_email"))
	private List<StudentEntity> students = new ArrayList<StudentEntity>();

	public String getBugName() {
		return bugName;
	}

	public void setBugName(String bugName) {
		this.bugName = bugName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<StudentEntity> getStudents() {
		return students;
	}

	public void setStudents(List<StudentEntity> students) {
		this.students = students;
	}

	public void addStudent(StudentEntity student) {
		if (!this.students.contains(student))
			this.students.add(student);
	}
	
	public void removeStudent(StudentEntity student) {
		if (this.students.contains(student))
			this.students.remove(student);
	}

}
