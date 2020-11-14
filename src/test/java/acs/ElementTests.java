//package acs;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.junit.Assert.fail;
//
//import java.util.Date;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//import java.util.stream.IntStream;
//
//import javax.annotation.PostConstruct;
//
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
//import org.springframework.boot.web.server.LocalServerPort;
//import org.springframework.web.client.RestTemplate;
//
//import acs.boundaries.ElementBoundary;
//import acs.boundaries.UserBoundary;
//import acs.data.CreatedBy;
//import acs.data.Location;
//import acs.data.UserRole;
//import javassist.expr.NewArray;
//
//@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
//public class ElementTests {
//	
//	private RestTemplate restTemplate;
//	private int port;
//	private String url;
//	private UserBoundary player;
//	private UserBoundary manager;
//	private UserBoundary admin;
//
//	@LocalServerPort
//	public void setPort(int port) {
//		this.port = port;
//	}
//	
//	@PostConstruct
//	public void init() {
//		this.url = "http://localhost:" + this.port + "/acs/";
//		this.restTemplate = new RestTemplate();
//
//	}
//	
////	@BeforeEach
//	public void teardUp() {
//		 admin = this.restTemplate.postForObject(
//				this.url + "users",
//				new UserBoundary(
//						"admin@gmail.com",
//						"admin",
//						":)",
////						UserRole.ADMIN),
//				UserBoundary.class);
//		
//		 player = this.restTemplate.postForObject(
//				this.url + "users",
//				new UserBoundary(
//						"player@gmail.com",
//						"player",
//						":))",
//						UserRole.PLAYER),
//				UserBoundary.class);
//		
//		 manager = this.restTemplate.postForObject(
//				this.url + "users",
//				new UserBoundary(
//						"manager@gmail.com",
//						"manager",
//						":)))",
//						UserRole.MANAGER),
//				UserBoundary.class);
//	}
//	
//	@AfterEach
//	public void teardDown()
//	{		
//		this.restTemplate.delete(
//				this.url + "/admin/elements/{adminEmail}",
//				admin.getEmail()
//				);
//		this.restTemplate.delete(
//				this.url + "/admin/users/{adminEmail}",
//				admin.getEmail()
//				);
//	}
//	
//	@Test
//	public void testDummy() {
//	}
//	
//	@Test
//	public void testCreateNewElement()
//	{
////	Given the server is up 
////	And E-mail that belongs to MANAGER. And Json with element details. 
////	When I create element with url: 
////	/acs/elements/{managerEmail} 
////	The I receive 2XX STATUS. 
////	And Json with element details. 
//		ElementBoundary elementBoundary = this.restTemplate.postForObject(
//				this.url + "/elements/{managerEmail}", 
//				new ElementBoundary(
//						"123",
//						"type1",
//						"roi",
//						true,
//						new Date(),
//						new CreatedBy("manager@gmail.com"),
//						new Location(),
//						new HashMap<>()
//						), 
//				ElementBoundary.class,
//				"manager@gmail.com");
//		
//	}
//	
//	@Test
//	public void testCreateNewElementWithEmailThatHisRoleIsNotMANGER()
//	{
////	 Given the server is up 
////	 And E-mail that belongs to PLAYER. And Json with element details. 
////	 When I create element with url: 
////	 /acs/elements/{managerEmail} 
////	The I receive 4XX STATUS. 
////	 And Json with element details. 
//		
//		try {
//		ElementBoundary elementBoundary = this.restTemplate.postForObject(
//				this.url + "/elements/{managerEmail}", 
//				new ElementBoundary(
//						"123",
//						"type1",
//						"roi",
//						true,
//						new Date(),
//						new CreatedBy("manager@gmail.com"),
//						new Location(),
//						new HashMap<>()
//						), 
//				ElementBoundary.class,
//				"player@gmail.com");
//		fail("Expected Not Manager Email");
//		}
//		catch (RuntimeException e) {
//		}
//	}
//	
//	@Test
//	public void testCreateNewElementWithNullToEmailField()
//	{
//
////	Given the server is up 
////	And Json with element details. 
////	When I create element with url: /acs/elements/ 
////	The I receive 4XX STATUS. 
//		try {
//		ElementBoundary elementBoundary = this.restTemplate.postForObject(
//				this.url + "/elements/", 
//				new ElementBoundary(
//						"123",
//						"type1",
//						"roi",
//						true,
//						new Date(),
//						new CreatedBy("manager@gmail.com"),
//						new Location(),
//						new HashMap<>()
//						), 
//				ElementBoundary.class,
//				"player@gmail.com");
//		fail("Expected Not Manager Email");
//		}
//		catch (RuntimeException e) {
//		}
//	}
//	
//	@Test
//	public void testCreateNewElementWithEmailThatHisRoleIsAdmin()
//	{
//	  
////	 Given the server is up 
////	 And E-mail that belongs to ADMIN. And Json with element details. 
////	 When I create element with url: 
////	 /acs/elements/{managerEmail} 
////	 The I receive 4XX STATUS. 
////	 And Json with element details. 
////	 And the system responds with the message: "The user is not Manager!" 
//
//		try {
//		ElementBoundary elementBoundary = this.restTemplate.postForObject(
//				this.url + "/elements/{managerEmail}/", 
//				new ElementBoundary(
//						"123",
//						"type1",
//						"roi",
//						true,
//						new Date(),
//						new CreatedBy("manager@gmail.com"),
//						new Location(),
//						new HashMap<>()
//						), 
//				ElementBoundary.class,
//				"admin@gmail.com");
//		fail("Expected Not Manager Email");
//		}
//		catch (RuntimeException e) {
//		}
//	}
//	
//	@Test
//	public void testGetSpecificElementThatHisActiveIsFalse()
//	{
//	
////	Given the server is up 
////	And e-mail that belongs to MANAGER. And correct element Id. 
////	When I get specific element with url: 
////	/acs/elements/{useremail}/{elementId} 
////	The I receive 2XX STATUS. 
////	And Json with element details. 
//		ElementBoundary elementBoundary = this.restTemplate.postForObject(
//				this.url + "/elements/{managerEmail}/", 
//				new ElementBoundary(
//						"1234",
//						"type1",
//						"roi",
//						false,
//						new Date(),
//						new CreatedBy("element@gmail.com"),
//						new Location(),
//						new HashMap<>()
//						), 
//				ElementBoundary.class,
//				"manager@gmail.com");
//		
//		ElementBoundary elementFromServer = this.restTemplate.getForObject(
//				this.url + "elements/{useremail}/{elementId}",
//				ElementBoundary.class,
//				elementBoundary.getCreatedby().getEmail(),
//				elementBoundary.getElementId()
//				);
//		
//		assertThat(elementFromServer.getElementId()).isEqualTo(elementBoundary.getElementId());
//	}
//	
//	@Test
//	public void testGetAllElementsIncludesElementsWithActiveThatIsFalse()
//	{
////	Given the server is up 
////	And e-mail that belongs to MANAGER 
////	When I get all element with url: 
////	/acs/elements/{managerEmail} 
////	The I receive 2XX STATUS. 
////	And Json with all elements details. 
//		
//		ElementBoundary elementBoundary1 = this.restTemplate.postForObject(
//				this.url + "/elements/{managerEmail}/", 
//				new ElementBoundary(
//						"1",
//						"type1",
//						"Roi",
//						false,
//						new Date(),
//						new CreatedBy("element1@gmail.com"),
//						new Location(),
//						new HashMap<>()
//						), 
//				ElementBoundary.class,
//				"manager@gmail.com");
//		
//		ElementBoundary elementBoundary2 = this.restTemplate.postForObject(
//				this.url + "/elements/{managerEmail}/", 
//				new ElementBoundary(
//						"2",
//						"type2",
//						"Tomer",
//						false,
//						new Date(),
//						new CreatedBy("element2@gmail.com"),
//						new Location(),
//						new HashMap<>()
//						), 
//				ElementBoundary.class,
//				"manager@gmail.com");
//		
//		ElementBoundary elementBoundary3 = this.restTemplate.postForObject(
//				this.url + "/elements/{managerEmail}/", 
//				new ElementBoundary(
//						"3",
//						"type3",
//						"Oren",
//						false,
//						new Date(),
//						new CreatedBy("element3@gmail.com"),
//						new Location(),
//						new HashMap<>()
//						), 
//				ElementBoundary.class,
//				"manager@gmail.com");
//		
//		
//		assertThat(this.restTemplate.getForObject(
//				this.url + "elements/{managerEmail}/",
//				ElementBoundary[].class,
//				"manager@gmail.com",
//				10,0))
//		.hasSize(3);
//	}
//
//	@Test
//	public void testGetAllElementsWithNullEmail()
//	{
//		//Given the server is up And null e-mail  
//		//When I get all element with url/acs/elements/ 
//		//The I receive 4XX STATUS. 
//		ElementBoundary elementBoundary1 = this.restTemplate.postForObject(
//				this.url + "/elements/{managerEmail}/", 
//				new ElementBoundary(
//						"1",
//						"type1",
//						"Roi",
//						false,
//						new Date(),
//						new CreatedBy("element1@gmail.com"),
//						new Location(),
//						new HashMap<>()
//						), 
//				ElementBoundary.class,
//				"manager@gmail.com");
//		
//		ElementBoundary elementBoundary2 = this.restTemplate.postForObject(
//				this.url + "/elements/{managerEmail}/", 
//				new ElementBoundary(
//						"2",
//						"type2",
//						"Tomer",
//						false,
//						new Date(),
//						new CreatedBy("element2@gmail.com"),
//						new Location(),
//						new HashMap<>()
//						), 
//				ElementBoundary.class,
//				"manager@gmail.com");
//		
//		ElementBoundary elementBoundary3 = this.restTemplate.postForObject(
//				this.url + "/elements/{managerEmail}/", 
//				new ElementBoundary(
//						"3",
//						"type3",
//						"Oren",
//						false,
//						new Date(),
//						new CreatedBy("element3@gmail.com"),
//						new Location(),
//						new HashMap<>()
//						), 
//				ElementBoundary.class,
//				"manager@gmail.com");
//		
//		try {
//			ElementBoundary[] elements = this.restTemplate.getForObject(
//					this.url + "elements/",
//					ElementBoundary[].class,
//					"manager@gmail.com",
//					10,0);
//			fail("Expected 404 STATUS ");
//		}
//		catch (RuntimeException e) {
//		}	
//
//
//	
//	}
//	
//	@Test
//	public void testUpdateElementById() 
//	{
//		
////		Given the server is up 
////		And e-mail that belongs to MANAGER. 
////		And correct id 
////		And Json with element details to update 
////		When I update element with url: 
////		/acs/elements/{useremail}/{elementId} 
////		The I receive 2XX STATUS
//		ElementBoundary elementBoundary1 = this.restTemplate.postForObject(
//				this.url + "/elements/{managerEmail}/", 
//				new ElementBoundary(
//						"1",
//						"type1",
//						"Roi",
//						false,
//						new Date(),
//						new CreatedBy("player@gmail.com"),
//						new Location(),
//						new HashMap<>()
//						), 
//				ElementBoundary.class,
//				"manager@gmail.com");
//		
//		Map<String, Object> update = new HashMap<>();
//		update.put("type", "2");
//		update.put("active", true);
//		
//		this.restTemplate.put(
//				this.url + "elements/{useremail}/{elementId}",
//				update,
//				"manager@gmail.com",
//				elementBoundary1.getElementId());
//		
//		assertThat(this.restTemplate.getForObject(
//				this.url + "elements/{useremail}/{elementId}",
//				ElementBoundary.class,
//				elementBoundary1.getCreatedby().getEmail(),
//				elementBoundary1.getElementId()))
//				.extracting(
//						"type",
//						"active"  )
//				.containsExactly(
//						update.get("type"),
//						update.get("active"));
//	}
//	
//	@Test
//	public void testSearchElementsByName() {
//		
////		Given the server is up 
////		And email that belongs to MANAGER. 
////		And element name that exist in the system. 
////		When I delete all elements with url: /acs/elements/{userEmail}/search/byName/{name} 
////		The I receive 2XX STATUS. 
////		And Json with all elements that as the same name.
//		
//		ElementBoundary elementBoundary1 = this.restTemplate.postForObject(
//				this.url + "/elements/{managerEmail}/", 
//				new ElementBoundary(
//						"1",
//						"type1",
//						"Roi",
//						false,
//						new Date(),
//						new CreatedBy("element1@gmail.com"),
//						new Location(),
//						new HashMap<>()
//						), 
//				ElementBoundary.class,
//				"manager@gmail.com");
//		
//		ElementBoundary elementBoundary2 = this.restTemplate.postForObject(
//				this.url + "/elements/{managerEmail}/", 
//				new ElementBoundary(
//						"2",
//						"type2",
//						"Tomer",
//						false,
//						new Date(),
//						new CreatedBy("element2@gmail.com"),
//						new Location(),
//						new HashMap<>()
//						), 
//				ElementBoundary.class,
//				"manager@gmail.com");
//		
//		ElementBoundary elementBoundary3 = this.restTemplate.postForObject(
//				this.url + "/elements/{managerEmail}/", 
//				new ElementBoundary(
//						"3",
//						"type3",
//						"Oren",
//						false,
//						new Date(),
//						new CreatedBy("element3@gmail.com"),
//						new Location(),
//						new HashMap<>()
//						), 
//				ElementBoundary.class,
//				"manager@gmail.com");
//		
//		ElementBoundary[] elementFromServer = this.restTemplate.getForObject(
//				this.url + "elements/{userEmail}/search/byName/{name}",
//				ElementBoundary[].class,
//				"manager@gmail.com",
//				"Roi"
//				);
//		assertThat(elementFromServer).hasSize(1);
//		assertThat(elementFromServer[0].getName()).isEqualTo(elementBoundary1.getName());
//	}
//
//	@Test
//	public void testSearchElementsByTypeAndSystemHave6ElementsWithThisType() {
//		
////		Given the server is up 
////		And email that belongs to MANAGER. 
////		And element type that exist in the system. 
////		When I Search all elements with url: 
////		/acs/elements/{userEmail}/search/byType/{type} 
////		The I receive 2XX STATUS. 
////		And Json with 5 first elements with the same type.
//		
//		
//		ElementBoundary elementBoundary1 = this.restTemplate.postForObject(
//				this.url + "/elements/{managerEmail}", 
//				new ElementBoundary(
//						"1",
//						"type1",
//						"roi",
//						true,
//						new Date(),
//						new CreatedBy("manager@gmail.com"),
//						new Location(),
//						new HashMap<>()
//						), 
//				ElementBoundary.class,
//				"manager@gmail.com");
//		
//		ElementBoundary elementBoundary2 = this.restTemplate.postForObject(
//				this.url + "/elements/{managerEmail}", 
//				new ElementBoundary(
//						"2",
//						"type1",
//						"roi",
//						true,
//						new Date(),
//						new CreatedBy("manager@gmail.com"),
//						new Location(),
//						new HashMap<>()
//						), 
//				ElementBoundary.class,
//				"manager@gmail.com");
//		
//		ElementBoundary elementBoundary3 = this.restTemplate.postForObject(
//				this.url + "/elements/{managerEmail}", 
//				new ElementBoundary(
//						"3",
//						"type1",
//						"roi",
//						true,
//						new Date(),
//						new CreatedBy("manager@gmail.com"),
//						new Location(),
//						new HashMap<>()
//						), 
//				ElementBoundary.class,
//				"manager@gmail.com");
//		
//		ElementBoundary elementBoundary4 = this.restTemplate.postForObject(
//				this.url + "/elements/{managerEmail}", 
//				new ElementBoundary(
//						"4",
//						"type1",
//						"roi",
//						true,
//						new Date(),
//						new CreatedBy("manager@gmail.com"),
//						new Location(),
//						new HashMap<>()
//						), 
//				ElementBoundary.class,
//				"manager@gmail.com");
//		
//		
//		ElementBoundary elementBoundary5 = this.restTemplate.postForObject(
//				this.url + "/elements/{managerEmail}", 
//				new ElementBoundary(
//						"5",
//						"type1",
//						"roi",
//						true,
//						new Date(),
//						new CreatedBy("manager@gmail.com"),
//						new Location(),
//						new HashMap<>()
//						), 
//				ElementBoundary.class,
//				"manager@gmail.com");
//		
//		ElementBoundary elementBoundary6 = this.restTemplate.postForObject(
//				this.url + "/elements/{managerEmail}", 
//				new ElementBoundary(
//						"6",
//						"type1",
//						"roi",
//						true,
//						new Date(),
//						new CreatedBy("manager@gmail.com"),
//						new Location(),
//						new HashMap<>()
//						), 
//				ElementBoundary.class,
//				"manager@gmail.com");
//		
//			ElementBoundary[] elements = this.restTemplate.getForObject(
//					this.url + "/elements/{userEmail}/search/byType/{type}",
//					ElementBoundary[].class,
//					"manager@gmail.com",
//					"type1"
//					);
//			assertThat(elements).hasSize(5);
//	}
//
//	
//	
//}
