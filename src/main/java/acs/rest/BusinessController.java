package acs.rest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import acs.boundaries.BusinessBoundary;
import acs.logic.BusinessService;


@CrossOrigin("*")
@RestController
public class BusinessController {

	private BusinessService businessService;
	
	@Autowired
	public BusinessController( BusinessService businessService) {
		super();
		this.businessService = businessService;
	}
	
	@RequestMapping(path = "/acs/business/login/{email}", 
					method = RequestMethod.GET, 
					produces = MediaType.APPLICATION_JSON_VALUE)
	public BusinessBoundary login(@PathVariable("email") String email) {

		return this.businessService.login(email);
	}

	@RequestMapping(path = "/acs/business", 
					method = RequestMethod.POST, 
					produces = MediaType.APPLICATION_JSON_VALUE,
					consumes = MediaType.APPLICATION_JSON_VALUE)
	public BusinessBoundary createBusiness(@RequestBody BusinessBoundary input)  {
	
	return this.businessService.createBusiness(input);
	}

}
