package acs.data.entity;
import javax.persistence.*;

@Entity
public class AdminEntity  {
@Id	 @GeneratedValue(strategy=GenerationType.AUTO)
	private String AdminID;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "email", referencedColumnName = "email", foreignKey=@ForeignKey(name = "fk_admin_email")) 
	private UserEntity user; 
	public AdminEntity() {
		super();
	}
	public String getAdminID() {
		return AdminID;
	}
	public void setAdminID(String adminID) {
		AdminID = adminID;
	}
	public UserEntity getUser() {
		return user;
	}
	public void setUser(UserEntity user) {
		this.user = user;
	}
	


}
