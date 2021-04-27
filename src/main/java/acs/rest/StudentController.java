package acs.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import acs.boundaries.StudentBoundary;

import acs.logic.StudentService;

@CrossOrigin("*")
@RestController
public class StudentController {

	@Autowired
	private StudentService studentService;

	@Autowired
	public StudentController() {
		super();
	}

	@RequestMapping(path = "/acs/students/login/{useremail}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public StudentBoundary login(@PathVariable("useremail") String email) {// throws Exception {

		return this.studentService.login(email);
	}

	@RequestMapping(path = "/acs/students/create", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public StudentBoundary createUser(@RequestBody StudentBoundary input) {// {throws Exception

		return this.studentService.createStudent(input);

	}

}
