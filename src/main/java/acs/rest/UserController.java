package acs.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import acs.boundaries.UserBoundary;
import acs.logic.UserService;

@CrossOrigin("*")
@RestController
public class UserController {

	private UserService userService;
	
	@Autowired
	public UserController(UserService userService) {
		super();
		this.userService = userService;
	}
	
	@RequestMapping(path = "/acs/users/login/{useremail}", 
					method = RequestMethod.GET, 
					produces = MediaType.APPLICATION_JSON_VALUE)
	public UserBoundary login(@PathVariable("useremail") String email) {//throws Exception {

		return this.userService.login(email);
	}

	
	@RequestMapping(path = "/acs/users", 
					method = RequestMethod.POST, 
					produces = MediaType.APPLICATION_JSON_VALUE,
					consumes = MediaType.APPLICATION_JSON_VALUE)
	public UserBoundary createUser(@RequestBody UserBoundary input)  {//  {throws Exception
	
	return this.userService.createUser(input);

	}

	@RequestMapping(path = "/acs/users/{userEmail}",
			method = RequestMethod.PUT, 
			consumes = MediaType.APPLICATION_JSON_VALUE)
	public void updateUserDetails(@PathVariable("userEmail") String email, @RequestBody UserBoundary input) {

		this.userService.updateUserDetails(email,input);

	}
}
