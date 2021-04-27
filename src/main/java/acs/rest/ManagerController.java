package acs.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import acs.boundaries.ManagerBoundary;

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

}
