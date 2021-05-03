package acs.data.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;

import javax.persistence.OneToMany;

@Entity
public class ClassEntity {

	@Id
	@Column(name = "className")
	private String className;

	private String createdByManager;

	@OneToMany(mappedBy = "studentClass", fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST,
			CascadeType.MERGE })
	private List<StudentEntity> students = new ArrayList<StudentEntity>();

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
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

		this.students.remove(student);
	}

	public String getCreatedByManager() {
		return createdByManager;
	}

	public void setCreatedByManager(String createdByManager) {
		this.createdByManager = createdByManager;
	}

}
