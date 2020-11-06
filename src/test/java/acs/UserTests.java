package acs;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.fail;
import static org.mockito.Mockito.verifyZeroInteractions;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.context.support.BeanDefinitionDsl.Role;
import org.springframework.web.client.RestTemplate;
import org.xmlunit.builder.Input;

import acs.boundaries.UserBoundary;
import acs.data.UserRole;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class UserTests {
	
		
		private RestTemplate restTemplate;
		private int port;
		private String url;
		
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
		@AfterEach
		public void tearDown() {
			UserBoundary admin = this.restTemplate.postForObject(
					this.url + "users",
					new UserBoundary(
							"admin@gmail.com",
							"admin",
							"Girl with long hair",
							UserRole.ADMIN),
					UserBoundary.class);
			
			this.restTemplate.delete(
					this.url +"/admin/users/{adminEmail}",
					admin.getEmail()
					);
		}

		@Test
		public void testDummy() {
		}
		
		@Test
		public void testCreationOfNewUserWithProperParameters()
		{
//			Given the server is up And Json with user details 
//			When I create new user with url: /acs/users 
//			Then I receive STATUS 2XX  And I receive Json with user details 
			
			UserBoundary userBoundaryInput = this.restTemplate.postForObject(
					this.url + "/users",
					new UserBoundary(
							"roi@gmail.com",
							"roi",
							"Girl with long hair",
							UserRole.PLAYER
							), 
					UserBoundary.class);
			
			UserBoundary userBoundaryFromServer = this.restTemplate.getForObject(
					this.url + "/users/login/{useremail}",
					UserBoundary.class,
					"roi@gmail.com");
			assertThat(userBoundaryFromServer.getEmail()).isEqualTo(userBoundaryInput.getEmail());
		}
		
		@Test
		public void testCreationOfNewUserWithEmailThatAlreadyExistFalse()
		{
//			Creation of new user with email that already exist.
//			Given the server is up And Json with user details 
//			When I create new user with url: /acs/users 
//			Then I receive STATUS 5XX  
//			And the system responds with the message: "could not create user for email" 
		    
			UserBoundary userBoundaryInputOld = this.restTemplate.postForObject(
					this.url + "/users",
					new UserBoundary(
							"roi@gmail.com",
							"roi",
							"Girl with long hair",
							UserRole.PLAYER),
					UserBoundary.class);

		    try {
			UserBoundary userBoundaryInputNew = this.restTemplate.postForObject(
					this.url + "/users",
					new UserBoundary(
							"roi@gmail.com",
							"roi",
							"Girl with long hair",
							UserRole.PLAYER),
					UserBoundary.class);
			fail("Expected Already Exist Email");
		    }
		    catch (RuntimeException e) {
			}
		    
		}
		
		@Test
		public void testCreationOfNewUserWithNullFalse() 
		{ 
//		Given the server is up And null Json. 
//		When I create new user with url: /acs/users 
//		Then I receive STATUS 4XX  
//		And the system responds with the message: "Required 
//		Request body is missing.." 
		    UserBoundary userBoundaryInput = new UserBoundary();

		    try {
				UserBoundary userBoundaryInputOld = this.restTemplate.postForObject(
						this.url + "/users",
						userBoundaryInput, 
						UserBoundary.class);
			fail("Expected Null Json");
		    }
		    catch (RuntimeException e) {
			}
		}
		
		@Test
		public void testCreationOfNewUserWithNullAtTheEmailFieldFalse() 
		{
//		Given the server is up And null Json. 
//		When I create new user with url: /acs/users 
//		Then I receive STATUS 5XX  
//		And the system responds with the message: "could not create user for email" 
			try {
				UserBoundary userBoundaryInput1 = this.restTemplate.postForObject(
						this.url + "/users",
						new UserBoundary(
								null,
								"roi",
								"Girl with long hair",
								UserRole.PLAYER
								), 
						UserBoundary.class);
				fail("Expected Null Email");
			}
			catch (RuntimeException e) {
			}
			

		}
		
		@Test
		public void testCreationOfNewUserWithNullAvatarFalse() 
		{
			
		
//		Given the server is up And Json with null avatar. 
//		When I create new user with url: /acs/users 
//		Then I receive STATUS 5XX  
//		And the system responds with the message: " invalid user avatar" 
			
		    try {
			UserBoundary userBoundaryInput1 = this.restTemplate.postForObject(
					this.url + "/users",
					new UserBoundary(
							"roi@gmail.com",
							"roi",
							null,
							UserRole.PLAYER),
					UserBoundary.class);
		    fail("Expected Null Avatar");
		    }
		    catch (RuntimeException e) {
			}
	    }
		
		@Test
		public void testLoginTheSystemWithProperEmail()
		{
//			Given the server is up 
//			And e-mail that recognized in the system. 
//			When I login with url: /acs/users/login/{useremail} 
//			Then I receive STATUS 2XX  
//			And I receive Json with user details of the e-mail 
		    		    
			UserBoundary userBoundaryInput1 = this.restTemplate.postForObject(
					this.url + "/users",
					new UserBoundary(
							"roi@gmail.com",
							"roi",
							"Girl with long hair",
							UserRole.PLAYER), 
					UserBoundary.class);
			
			UserBoundary userBoundaryFromServer = this.restTemplate.getForObject(
					this.url + "/users/login/{useremail}",
					UserBoundary.class,
					userBoundaryInput1.getEmail());
			
			assertThat(userBoundaryFromServer.getEmail()).isEqualTo(userBoundaryInput1.getEmail());
		}
		
		@Test
		public void testLoginTheSystemWithiInvalidEmailFalse()
		{
//			Given the server is up 
//			And e-mail that isn't recognized in the system. 
//			When I login with url: /acs/users/login/{useremail} • Then I receive STATUS 4XX  
//			And the system responds with the message: "could not find message for this email" 
		    
		    
			UserBoundary userBoundaryInput = this.restTemplate.postForObject(
					this.url + "/users",
					new UserBoundary(
							"roi@gmail.com",
							":(",
							"Girl with long hair",
							UserRole.PLAYER
							), 
					UserBoundary.class);
			try {
				UserBoundary userBoundaryInputAfterLogin = this.restTemplate.getForObject(
						this.url + "/users/login/{useremail}",
						UserBoundary.class,
						"roi12@gmail.com");
				fail("Expected Invalid Email");
			}
			catch (RuntimeException e) {
			}
		}

		@Test
		public void testUpdateUserDetailsWithProperEmail()
		{
//		Given the server is up 
//		And e-mail that recognized in the system. And Json with parameters to update. 
//		When I update with url: /acs/users/{userEmail} 
//		Then I receive STATUS 2XX  

			UserBoundary userBoundaryInput = this.restTemplate.postForObject(
					this.url + "/users",
					new UserBoundary(
							"roi@gmail.com",
							"roi",
							"Girl with long hair",
							UserRole.PLAYER
							),
					UserBoundary.class);
			
			Map<String, Object> update = new HashMap<>();
			update.put("username", "roi naftali");
			update.put("avatar", ":))))");
			this.restTemplate.put(
					this.url + "/users/{userEmail}",
					update,
					userBoundaryInput.getEmail());
			
			assertThat(this.restTemplate.getForObject(
					this.url + "/users/login/{useremail}",
					UserBoundary.class,
					userBoundaryInput.getEmail()))
			.extracting(
					"username",
					"avatar"  )
			.containsExactly(
					update.get("username"),
					update.get("avatar"));
			
		}
		@Test
	
		public void testUpdateUserDetailsWithInvalidEmail()
		{

//			Given the server is up 
//			And e-mail that isn't recognized in the system. And Json with parameters to update. 
//			When I update with url: /acs/users/{userEmail} 
//			Then I receive STATUS 4XX 
//			And the system respond with the message: "could not update message for email…" 

			UserBoundary userBoundaryInput = this.restTemplate.postForObject(
					this.url + "/users",
					new UserBoundary(
							"roi@gmail.com",
							"roi",
							"Girl with long hair",
							UserRole.PLAYER
							), 
					UserBoundary.class);
			
			try {
				userBoundaryInput.setUserName("roinaftali");
				this.restTemplate.put(
						this.url + "/users/{userEmail}",
						userBoundaryInput,
						"notExist@gmail.com");
				fail("Expected Invalid Email");
				}
			catch (RuntimeException e) {
				
			}
		}
		
		@Test
		public void testUpdateUserDetailsWithProperEmailAndNullJson()
		{
//		Given the server is up 
//		And e-mail that recognized in the system. And null Json. 
//		When I update with url: /acs/users/{userEmail} 
//		Then I receive STATUS 4XX 
//		And the system responds with the message: "Required 
//		Request body is missing.." 
			UserBoundary userBoundaryInput = this.restTemplate.postForObject(
					this.url + "/users",
					new UserBoundary(
							"roi@gmail.com",
							"roi",
							"Girl with long hair",
							UserRole.PLAYER
							), 
					UserBoundary.class);
			
			try {
				userBoundaryInput.setUserName("roinaftali");
				this.restTemplate.put(
						this.url + "/users/{userEmail}",
						null,
						"notExist@gmail.com");
				fail("Expected Invalid Email");
				}
			catch (RuntimeException e) {
				
			}
			
		}
}





