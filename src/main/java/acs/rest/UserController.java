package acs.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import acs.boundaries.PasswordBoundary;
import acs.boundaries.PersonalInfoBoundary;
import acs.boundaries.UserBoundary;
import acs.logic.UserService;
import acs.logic.UserServiceWithDB;

@CrossOrigin("*")
@RestController
public class UserController {

	private UserServiceWithDB userService;
	
	@Autowired
	public UserController(UserServiceWithDB userService) {
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
	public void updateUserDetails(@PathVariable("userEmail") String email, @RequestBody PersonalInfoBoundary input) {

		this.userService.updateUserDetails(email,input);

	}

	@RequestMapping(path = "/acs/users/detail/{userEmail}",
			method = RequestMethod.GET, 
					produces = MediaType.APPLICATION_JSON_VALUE)
	public PersonalInfoBoundary getUserDetails(@PathVariable("userEmail") String email) {

		return this.userService.getUserDetails(email);

	}
	
	
	@RequestMapping(path = "/acs/users/verify/{userEmail}",
			method = RequestMethod.GET, 
					produces = MediaType.APPLICATION_JSON_VALUE)
	public Boolean verify(@PathVariable("userEmail") String email) {

		return this.userService.verify(email);

	}

	
	@RequestMapping(path = "/acs/users/updatePassword/{userEmail}",
			method = RequestMethod.PUT, 
					produces = MediaType.APPLICATION_JSON_VALUE)
	public UserBoundary  updateUserPassword(@PathVariable("userEmail") String email ,@RequestBody PasswordBoundary input ) {

		return this.userService.updateUserPassword(email ,input);

	}

	
}
