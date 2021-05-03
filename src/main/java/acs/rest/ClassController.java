
package acs.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import acs.boundaries.ClassBoundary;
import acs.boundaries.StudentClassBoundary;
import acs.logic.ClassService;

@CrossOrigin("*")
@RestController
public class ClassController {

	@Autowired
	private ClassService classService;

	@Autowired
	public ClassController() {
		super();

	}

	@RequestMapping(path = "/acs/classes/create", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ClassBoundary createClass(@RequestBody ClassBoundary input) {// {throws Exception

		return this.classService.create(input);

	}

	@RequestMapping(path = "/acs/classes/getClass", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ClassBoundary getOneClass(@RequestBody ClassBoundary input) {// {throws Exception
		return this.classService.getOneClass(input);
	}

	@RequestMapping(path = "/acs/classes/getAllClasses", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public List<ClassBoundary> getAllClasses(@RequestBody ClassBoundary input) {// {throws Exception

		return this.classService.getAllClasses(input);
	}

	@RequestMapping(path = "/acs/classes/addStudentToClass", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void addStudentToClass(@RequestBody StudentClassBoundary input) {// {throws Exception

		this.classService.addStudentToClass(input);
	}

	@RequestMapping(path = "/acs/classes/removeStudentToClass", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void removeStudentToClass(@RequestBody StudentClassBoundary input) {// {throws Exception

		this.classService.removeStudentFromClass(input);
	}

}
