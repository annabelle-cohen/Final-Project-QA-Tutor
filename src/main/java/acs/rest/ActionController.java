package acs.rest;


import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import acs.boundaries.ActionBoundary;
import acs.logic.ActionService;

@CrossOrigin
@RestController
public class ActionController {
	
	
	private ActionService actionService;
	
	
	public ActionController(ActionService actionService) {
		super();
		this.actionService = actionService;
	}


	@RequestMapping(path = "/acs/actions", 
					method = RequestMethod.POST, 
					produces = MediaType.APPLICATION_JSON_VALUE,
					consumes=MediaType.APPLICATION_JSON_VALUE)
	public Object invokeAction(@RequestBody ActionBoundary input) {

		return actionService.invokeAction(input);
	}

}
