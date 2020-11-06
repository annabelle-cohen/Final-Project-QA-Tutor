package acs.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import acs.boundaries.ActionBoundary;
import acs.boundaries.UserBoundary;
import acs.logic.EnhanceActionService;
import acs.logic.EnhanceElementService;
import acs.logic.EnhanceUserService;

@CrossOrigin
@RestController
public class AdminController {
	
	private EnhanceUserService userService;
	private EnhanceActionService actionService;
	private EnhanceElementService elementService;
	

	@Autowired
	public AdminController(EnhanceUserService userService,EnhanceActionService actionService,
			EnhanceElementService elementService) {
		super();
		this.userService = userService;
		this.actionService = actionService;
		this.elementService = elementService;
	}
	
	
	@RequestMapping(path = "/acs/admin/users/{adminEmail}", 
					method = RequestMethod.GET, 
					produces = MediaType.APPLICATION_JSON_VALUE)
	public UserBoundary[] exportAllUsers(@PathVariable("adminEmail") String email,
			@RequestParam(name = "page",required = false,defaultValue = "0")int page,
			@RequestParam(name = "size",required = false,defaultValue = "5")int size)
	{// throws Exception {

		return this.userService.exportAllUsers(email,size,page).toArray(new UserBoundary[0]);
	}

	@RequestMapping(path = "/acs/admin/actions/{adminEmail}",
					method = RequestMethod.GET, 
					produces = MediaType.APPLICATION_JSON_VALUE)
	public ActionBoundary[] exportAllActions(@PathVariable("adminEmail") String email,
			@RequestParam(name = "page",required = false,defaultValue = "0")int page,
			@RequestParam(name = "size",required = false,defaultValue = "5")int size)
	{// throws Exception {

		return  this.actionService.ExportAllActions(email,size,page).toArray(new ActionBoundary[0]);
	}

	@RequestMapping(path = "/acs/admin/users/{adminEmail}",
					method = RequestMethod.DELETE)
	public void deleteAllUseres(@PathVariable("adminEmail") String adminEmail) {//throws Exception {

		this.userService.deleteAllUseres(adminEmail);
	}

	@RequestMapping(path = "/acs/admin/elements/{adminEmail}",
					method = RequestMethod.DELETE)
	public void deleteAllElements(@PathVariable("adminEmail") String adminEmail) throws Exception {

		this.elementService.deleteAllElements(adminEmail);
	}

	@RequestMapping(path = "/acs/admin/actions/{adminEmail}", method = RequestMethod.DELETE)
	public void deleteAllActions(@PathVariable("adminEmail") String adminEmail) throws Exception {

		this.actionService.deleteAllActions(adminEmail);
	}

}
