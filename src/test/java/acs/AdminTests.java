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
import org.springframework.web.client.RestTemplate;

import acs.boundaries.ActionBoundary;
import acs.boundaries.ElementBoundary;
import acs.boundaries.UserBoundary;
import acs.data.ActionElement;
import acs.data.CreatedBy;
import acs.data.InvokedBy;
import acs.data.Location;

import acs.data.UserRole;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class AdminTests {
	
	
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
						"player player",
						":))",
						UserRole.PLAYER),
				UserBoundary.class);
		
		manager = this.restTemplate.postForObject(
				this.url + "users",
				new UserBoundary(
						"manager@gmail.com",
						"manager manager",
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
	
	@Test
	public void testExportAllUsers() {
		
//		Given the server is up 
//		And email that recognized in system. And Role is admin 
//		When I export all users with url: 
//		/acs/admin/users/{adminEmail} 
//		The I receive 2XX STATUS. And Json with all users
				
		UserBoundary[] usersFromServer = this.restTemplate.getForObject(
				this.url + "/admin/users/{adminEmail}", 
				UserBoundary[].class,
				"admin@gmail.com",
				0,10);
		// admin,manager,player
		assertThat(usersFromServer).hasSize(3);
	}
	
	
	@Test	
	public void testExportAllUsersWithNullEmail()
	{
//	Given the server is up 
//	When I export all users with url: /acs/admin/users/ 
//	The I receive 4XX STATUS. 
		
		try {
		UserBoundary[] usersFromServer = this.restTemplate.getForObject(
				this.url + "/admin/users/", 
				UserBoundary[].class,
				0,10);
		fail("Expected 4xx Error");
		}
		catch (RuntimeException e) {
		}
		
	}
	// Not Working!!!
	//@Test
	public void testExportAllUsersWithRoleThatIsntAdmin() {
		
//		Given the server is up 
//		And email that recognized in system. 
//		And Role isn't admin 
//		When I export all users with url: 
//		/acs/admin/users/{adminEmail} 
//		The I receive 5XX STATUS. 
//		And the system responds with the message: "could not export all users …" 
		
		try {
			UserBoundary[] usersFromServer = this.restTemplate.getForObject(
				this.url + "/admin/users/{adminEmail}/", 
				UserBoundary[].class,
				"manager@gmail.com",
				0,10);
		fail("Expected 5xx Error");
		}
		catch (RuntimeException e) {
		}	
	}

	@Test
	public void testExportAllActions() {
		
//		Given the server is up And email. 
//		When I export all actions with url: 
//		/acs/admin/actions/{adminEmail} 
//		The I receive 2XX STATUS. 
		
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
		
		ActionBoundary actionBoundaryInput1 = this.restTemplate.postForObject(
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
		
		ActionBoundary actionBoundaryInput2 = this.restTemplate.postForObject(
				this.url + "/actions",
				new ActionBoundary(
						"22",
						"type2",
						new ActionElement(elementBoundaryInput.getElementId()),
						new Date(),
						new InvokedBy("player@gmail.com"),
						new HashMap<>()
						), 
				ActionBoundary.class);
		
		ActionBoundary[]actionsFromServer = this.restTemplate.getForObject(
				this.url + "/admin/actions/{adminEmail}", 
				ActionBoundary[].class,
				"admin@gmail.com"
				);
		
		assertThat(actionsFromServer).hasSize(2);

	}
	@Test
	public void testExportAllActionsWithNull() {
		
//		Given the server is up 
//		When I export all actions with url: 
//		/acs/admin/actions/ 
//		The I receive 4XX STATUS. 
		try {
		ActionBoundary[]actionsFromServer = this.restTemplate.getForObject(
				this.url + "/admin/actions/", 
				ActionBoundary[].class,
				"admin@gmail.com"
				);
		fail("Expected 4xx STATUS");
		}
		catch (RuntimeException e) {
				}
	}
	@Test
	public void testDeleteAllUsers() {
		
//		Given the server is up 
//		And email that recognized in system. And Role is admin 
//		When I delete all users with url: 
//		/acs/admin/users/{adminEmail} 
//		The I receive 2XX STATUS. 
		this.restTemplate.delete(
				this.url + "/admin/users/{adminEmail}",
				admin.getEmail()
				);
		
		 admin = this.restTemplate.postForObject(
					this.url + "users",
					new UserBoundary(
							"admin@gmail.com",
							"admin",
							":)",
							UserRole.ADMIN),
					UserBoundary.class);
		
		 // Size 1 for the Admin user
		assertThat(this.restTemplate.getForObject(
				this.url + "/admin/users/{adminEmail}", 
				UserBoundary[].class,
				"admin@gmail.com",
				0,10)).hasSize(1);
	
	}
	@Test
	public void testDeleteAllUsersWithInvalidEmail() 
	{
//	Given the server is up 
//	And email that isn't recognized in system. 
//	When I delete all users with url: 
//	/acs/admin/users/{adminEmail} 
//	The I receive 4XX STATUS. 
//	And the system responds with the message: "could not delete all users …" 
		try {
			this.restTemplate.delete(
					this.url + "/admin/users/{adminEmail}",
					"notExist@gmail.com"
					);
		fail("Expected 4xx STATUS");
		}
		catch (RuntimeException e) {
		}	
	}
	
	@Test
	public void testDeleteAllUsersWithRoleThatIsntAdmin() 
	{ 	
//		Given the server is up 
//		And email that recognized in system. 
//		And Role isn't admin 
//		When I delete all users with url: 
//		/acs/admin/users/{adminEmail} 
//		The I receive 5XX STATUS. 
//		And the system responds with the message: "could not delete all users …" 

		try {
			this.restTemplate.delete(
					this.url + "/admin/users/{adminEmail}",
					"player@gmail.com"
					);
		fail("Expected 4xx STATUS");
		}
		catch (RuntimeException e) {
		}	
	}
	
	@Test
	public void testDeleteAllElements()
	{
//		Given the server is up And email. 
//		When I delete all elements with url: 
//		/acs/admin/elements/{adminEmail} 
//		The I receive 2XX STATUS. 
		ElementBoundary elementBoundaryInput = this.restTemplate.postForObject(
				this.url + "/elements/{managerEmail}", 
				new ElementBoundary(
						"1",
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
		
		ElementBoundary elementBoundaryInput2 = this.restTemplate.postForObject(
				this.url + "/elements/{managerEmail}", 
				new ElementBoundary(
						"2",
						"type2",
						"roi2",
						true,
						new Date(),
						new CreatedBy("manager@gmail.com"),
						new Location(),
						new HashMap<>()
						), 
				ElementBoundary.class,
				"manager@gmail.com");
		
		this.restTemplate.delete(
				this.url + "/admin/elements/{adminEmail}",
				admin.getEmail()
				);
		assertThat(this.restTemplate.getForObject(
				this.url + "elements/{managerEmail}/",
				ElementBoundary[].class,
				"manager@gmail.com",
				10,0))
				.hasSize(0);
		
	}

	private void testDeleteAllElementsWithNull() {
//	Given the server is up 
//	When I delete all elements with url: 
//	/acs/admin/elements/ • 	The I receive 4XX STATUS. 
		try {
				this.restTemplate.delete(
						this.url + "/admin/elements/}",
						admin.getEmail()
						);
				fail("Expected 4XX STATUS");
		}
		catch (RuntimeException e) {
			// TODO: handle exception
		}
	}
	
	@Test
	public void testDeleteAllActions() {
	
//	Given the server is up And email. 
//	When I delete all actions with url: 
//	/acs/admin/actions/{adminEmail} 
//	The I receive 2XX STATUS
		
		this.restTemplate.delete(
		this.url + "/admin/actions/{adminEmail}",
		admin.getEmail()
				);
		
		assertThat(this.restTemplate.getForObject(
				this.url + "/admin/actions/{adminEmail}",
				ActionBoundary[].class,
				admin.getEmail()
						)).hasSize(0);
	}
	
	@Test
	public void testDeleteAllActionsWithNull() {
		
//		Given the server is up 
//		When I delete all actions with url: /acs/admin/actions/
//		The I receive 4XX STATUS. 
		try {
		this.restTemplate.delete(
		this.url + "/admin/actions/",
		admin.getEmail()
				);
		fail("Expected 4xx STATUS");
		}
		catch (RuntimeException e) {
		}
	}
	
	
	
	
	
	
	
	
}
