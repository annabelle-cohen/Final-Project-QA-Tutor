package acs.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import acs.boundaries.AddBugBoundary;
import acs.boundaries.AddBugToStudentBoundary;
import acs.boundaries.BugBoundary;
import acs.boundaries.ManagerBoundary;
import acs.boundaries.StudentBoundary;
import acs.logic.ManagerService;

@CrossOrigin("*")
@RestController
public class ManagerController {

	@Autowired
	private ManagerService managerService;

	@Autowired
	public ManagerController() {
		super();

	}

	@RequestMapping(path = "/acs/managers/login/{useremail}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ManagerBoundary login(@PathVariable("useremail") String email) {// throws Exception {

		return this.managerService.login(email);
	}

	@RequestMapping(path = "/acs/managers", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ManagerBoundary createUser(@RequestBody ManagerBoundary input) {// {throws Exception

		return this.managerService.createManager(input);

	}

	@RequestMapping(path = "/acs/managers/addBugToStudent", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public StudentBoundary addBugToStudent(@RequestBody AddBugToStudentBoundary input) {// {throws Exception

		return this.managerService.addBugToStudent(input);

	}

	@RequestMapping(path = "/acs/managers/addBug", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public BugBoundary addBug(@RequestBody AddBugBoundary input) {// {throws Exception

		return this.managerService.addBug(input);

	}

	@RequestMapping(path = "/acs/managers/getAllBugs", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public List<BugBoundary> getAllBugs(@RequestBody ManagerBoundary input) {// {throws Exception

		return this.managerService.getAllBugs(input);

	}
}
