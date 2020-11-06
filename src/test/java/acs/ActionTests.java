package acs;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.fail;

import java.util.Date;
import java.util.HashMap;


import javax.annotation.PostConstruct;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.context.support.BeanDefinitionDsl.Role;
import org.springframework.web.client.RestTemplate;

import acs.boundaries.ActionBoundary;
import acs.boundaries.ElementBoundary;
import acs.boundaries.UserBoundary;
import acs.data.ActionElement;
import acs.data.CreatedBy;
import acs.data.ElementConverter;
import acs.data.InvokedBy;
import acs.data.Location;
import acs.data.UserEntity;
import acs.data.UserRole;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class ActionTests {
	
	private RestTemplate restTemplate;
	private int port;
	private String url;
	private UserBoundary player;
	private UserBoundary manager;
	private UserBoundary admin;
	
	@LocalServerPort
	public void setPort(int port) {
		this.port = port;
	}
	
	@PostConstruct
	public void init() {
		this.url = "http://localhost:" + this.port + "/acs/";
		this.restTemplate = new RestTemplate();

	}
	@BeforeEach
	public void teardUp() {
		 admin = this.restTemplate.postForObject(
				this.url + "users",
				new UserBoundary(
						"admin@gmail.com",
						"admin",
						":)",
						UserRole.ADMIN),
				UserBoundary.class);
		
		player = this.restTemplate.postForObject(
				this.url + "users",
				new UserBoundary(
						"player@gmail.com",
						"player",
						":))",
						UserRole.PLAYER),
				UserBoundary.class);
		
		manager = this.restTemplate.postForObject(
				this.url + "users",
				new UserBoundary(
						"manager@gmail.com",
						"manager",
						":)))",
						UserRole.MANAGER),
				UserBoundary.class);
	}
	
	
	@AfterEach
	public void teardDown()
	{		

		this.restTemplate.delete(
				this.url + "/admin/actions/{adminEmail}",
				admin.getEmail()
				);
		this.restTemplate.delete(
				this.url + "/admin/elements/{adminEmail}",
				admin.getEmail()
				);
		this.restTemplate.delete(
				this.url + "/admin/users/{adminEmail}",
				admin.getEmail()
				);
	}
	
	@Test
	public void testDummy() {
	}
	
	// Add getForObjectTest
	@Test
	public void testInvokeAnAction()
	{
//	Given the server is up 
//	And E-mail that belongs to PLAYER And Json with action details. 
//	When I invoke action with url: /acs/actions 
//	The I receive 2XX STATUS. And Json with action details 
		
		ElementBoundary elementBoundaryInput = this.restTemplate.postForObject(
				this.url + "/elements/{managerEmail}", 
				new ElementBoundary(
						"123",
						"type1",
						"roi",
						true,
						new Date(),
						new CreatedBy("manager@gmail.com"),
						new Location(),
						new HashMap<>()
						), 
				ElementBoundary.class,
				"manager@gmail.com");
		
		
		ActionBoundary actionBoundaryInput = this.restTemplate.postForObject(
				this.url + "/actions",
				new ActionBoundary(
						"11",
						"type1",
						new ActionElement(elementBoundaryInput.getElementId()),
						new Date(),
						new InvokedBy("player@gmail.com"),
						new HashMap<>()
						), 
				ActionBoundary.class);

	}	


@Test
public void testInvokeAnActionWithNullJson()
{ 
//	Given the server is up And null Json. 
//	When I invoke action with url: /acs/actions 
//	The I receive 4XX STATUS. 
//	And the system responds with the message: "Required 
//	Request body is missing.." 
	
	try {
	ActionBoundary actionBoundaryInput = this.restTemplate.postForObject(
			this.url + "/actions",
			null, 
			ActionBoundary.class);
	fail("Expected 4xx Error");
	}
	catch (RuntimeException e) {
	}
}

@Test
public void InvokeAnActionByManager() 
{
	
//	Given the server is up 
//	And E-mail that belongs to MANAGER And Json with action details. 
//	When I invoke action with url: /acs/actions 
//	The I receive 4XX STATUS. 
//	And the system responds with the message: "The user must be Player!" 
	ElementBoundary elementBoundaryInput = this.restTemplate.postForObject(
			this.url + "/elements/{managerEmail}", 
			new ElementBoundary(
					"123",
					"type1",
					"roi",
					true,
					new Date(),
					new CreatedBy("manager@gmail.com"),
					new Location(),
					new HashMap<>()
					), 
			ElementBoundary.class,
			"manager@gmail.com");
	
	try {
	ActionBoundary actionBoundaryInput = this.restTemplate.postForObject(
			this.url + "/actions",
			new ActionBoundary(
					"11",
					"type1",
					new ActionElement(elementBoundaryInput.getElementId()),
					new Date(),
					new InvokedBy("manager@gmail.com"),
					new HashMap<>()
					), 
			ActionBoundary.class);
	fail("Expected - The user must be Player!");
	}
	catch (RuntimeException e) {
	}
}

@Test
public void InvokeAnActionByAdmin() {
//	Given the server is up 
//	And E-mail that belongs to ADMIN And Json with action details. 
//	When I invoke action with url: /acs/actions 
//	The I receive 4XX STATUS. 
//	And the system responds with the message: "The user must be Player!" 
	ElementBoundary elementBoundaryInput = this.restTemplate.postForObject(
			this.url + "/elements/{managerEmail}", 
			new ElementBoundary(
					"123",
					"type1",
					"roi",
					true,
					new Date(),
					new CreatedBy("manager@gmail.com"),
					new Location(),
					new HashMap<>()
					), 
			ElementBoundary.class,
			"manager@gmail.com");
	
	try {
	ActionBoundary actionBoundaryInput = this.restTemplate.postForObject(
			this.url + "/actions",
			new ActionBoundary(
					"11",
					"type1",
					new ActionElement(elementBoundaryInput.getElementId()),
					new Date(),
					new InvokedBy("admin@gmail.com"),
					new HashMap<>()
					), 
			ActionBoundary.class);
	fail("Expected - The user must be Player!");
	}
	catch (RuntimeException e) {
	}
}

@Test
public void testInvokeAnActionWithElementIdThatDoesntExist() 
{ 
//	Given the server is up 
//	And E-mail that belongs to PLAYER 
//	And element id that isn't recognize in system And Json with action details. 
//	When I invoke action with url: /acs/actions 
//	the I receive 4XX STATUS. 
//	And the system responds with the message: "Could not find element OR element is not active" 
	ElementBoundary elementBoundaryInput = this.restTemplate.postForObject(
			this.url + "/elements/{managerEmail}", 
			new ElementBoundary(
					"123",
					"type1",
					"roi",
					true,
					new Date(),
					new CreatedBy("manager@gmail.com"),
					new Location(),
					new HashMap<>()
					), 
			ElementBoundary.class,
			"manager@gmail.com");
	
	try {
	ActionBoundary actionBoundaryInput = this.restTemplate.postForObject(
			this.url + "/actions",
			new ActionBoundary(
					"11",
					"type1",
					new ActionElement("doesnt exist"),
					new Date(),
					new InvokedBy("player@gmail.com"),
					new HashMap<>()
					), 
			ActionBoundary.class);
	fail("Expected - The user must be Player!");
	}
	catch (RuntimeException e) {
	}
}


}
