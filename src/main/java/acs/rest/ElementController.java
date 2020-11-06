package acs.rest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import acs.boundaries.ElementBoundary;
import acs.boundaries.ElementIdWrapper;
import acs.logic.EnhanceElementService;
@CrossOrigin
@RestController
public class ElementController {

	
	private EnhanceElementService elementService;
	
	@Autowired
	public ElementController(EnhanceElementService elementService) {
		super();
		this.elementService = elementService;
	}
	
	@RequestMapping(path = "/acs/elements/{useremail}/{elementId}",
			method = RequestMethod.GET, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ElementBoundary getElement(@PathVariable("useremail") String email,
			@PathVariable("elementId") String elementID) throws Exception {
		return this.elementService.getSpecificElement(email,elementID); 	

	}

	@RequestMapping(path = "/acs/elements/{useremail}", 
			method = RequestMethod.GET, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ElementBoundary[] getAllElements(@PathVariable("useremail") String email,
				@RequestParam(name = "page",required = false,defaultValue = "0") int page,
				@RequestParam(name = "size",required = false,defaultValue = "5") int size){

		return this.elementService.getAll(email,size,page).toArray(new ElementBoundary[0]);

	}

	@RequestMapping(path = "/acs/elements/{managerEmail}",
			method = RequestMethod.POST,
			produces = MediaType.APPLICATION_JSON_VALUE,
			consumes = MediaType.APPLICATION_JSON_VALUE)
	public ElementBoundary createElement(@PathVariable("managerEmail") String managerEmail,
			@RequestBody ElementBoundary input) {//throws Exception {

		
		return this.elementService.create(managerEmail,input);

	}

	@RequestMapping(path = "/acs/elements/{useremail}/{elementId}",
			method = RequestMethod.PUT,
			consumes = MediaType.APPLICATION_JSON_VALUE)
	public void updateElement(@PathVariable("useremail") String email, @PathVariable("elementId") String elementId,
			@RequestBody ElementBoundary input) {// throws Exception {

		
		 this.elementService.update(email,elementId,input);

	}
	
	@RequestMapping(path = "/acs/elements/{managerEmail}/{parentElementId}/children",
				method = RequestMethod.PUT,
				consumes = MediaType.APPLICATION_JSON_VALUE)
	public void addChildrenToElement(@PathVariable("managerEmail") String email,
									 @PathVariable("parentElementId") String parentElementId,
									 @RequestBody ElementIdWrapper elementId) {
		this.elementService.
				addChildrenToElement(email,parentElementId,elementId.getElementId());
	}
	
	@RequestMapping(path = "acs/elements/{userEmail}/{parentElementId}/children",
				method = RequestMethod.GET,
				produces = MediaType.APPLICATION_JSON_VALUE)
	public ElementBoundary[] getElementChildren(
									@PathVariable("userEmail") String email,
									@PathVariable("parentElementId") String parentElementId,
									@RequestParam(name = "page",required = false,defaultValue = "0")int page,
									@RequestParam(name = "size",required = false,defaultValue = "5")int size) {
		return this.elementService
					.getElementChildren(email,parentElementId,size,page)
					.toArray(new ElementBoundary[0]);	
	}
	
	
	@RequestMapping(path = "/acs/elements/{userEmail}/{childrenElementId}/parents",
					method = RequestMethod.GET,
					produces = MediaType.APPLICATION_JSON_VALUE)
	public ElementBoundary[] getElementParents(
								@PathVariable("userEmail") String email,
								@PathVariable("childrenElementId") String childrenElementId,
								@RequestParam(name = "page",required = false,defaultValue = "0")int page,
								@RequestParam(name = "size",required = false,defaultValue = "5")int size) {
		return this.elementService
					.getElementParents(email,childrenElementId,size,page)
					.toArray(new ElementBoundary[0]);
		
	}
	///new according spec - sprint 5
	@RequestMapping(path = "/acs/elements/{userEmail}/search/byName/{name}",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ElementBoundary[] searchElementsByName(@PathVariable("userEmail") String email,@PathVariable("name") String name,
			@RequestParam(name = "page",required = false,defaultValue = "0")int page,
			@RequestParam(name = "size",required = false,defaultValue = "5")int size) {
		return this.elementService
				.getElementsByName(email,name,size,page).toArray(new ElementBoundary[0]);
	 
	}
	///new according spec - sprint 5
	@RequestMapping(path = "/acs/elements/{userEmail}/search/byType/{type}",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ElementBoundary[] searchElementsByType(@PathVariable("userEmail") String email,@PathVariable("type") String type,
			@RequestParam(name = "page",required = false,defaultValue = "0")int page,
			@RequestParam(name = "size",required = false,defaultValue = "5")int size) {
	 return this.elementService
				.getElementsByType(email,type,size,page).toArray(new ElementBoundary[0]);
	}
	
	
}
