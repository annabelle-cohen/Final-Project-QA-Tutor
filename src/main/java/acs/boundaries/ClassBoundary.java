package acs.boundaries;

import java.util.List;

public class ClassBoundary {

	private String className;

	private String manager;

	private List<StudentBoundary> students ;;

	public ClassBoundary(String className, String createdByManager, List<StudentBoundary> students) {
		super();

		this.className = className;
		this.manager = createdByManager;
		this.students = students;
	}

	public ClassBoundary() {
		// TODO Auto-generated constructor stub
	}

	public String getManager() {
		return manager;
	}

	public void setManager(String createdByManager) {
		this.manager = createdByManager;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public List<StudentBoundary> getStudents() {
		return students;
	}

	public void setStudents(List<StudentBoundary> students) {
		this.students = students;
	}

}
