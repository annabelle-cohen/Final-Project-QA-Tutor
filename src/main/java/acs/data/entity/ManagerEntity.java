package acs.data.entity;
import javax.persistence.*;

@Entity
public class ManagerEntity  {
	@Id	
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long ManagerID;


	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_email", referencedColumnName = "email", foreignKey=@ForeignKey(name = "fk_manager_email"))
	private UserEntity user; 
	public ManagerEntity() {
		super();
	}
	public Long getManagerID() {
		return ManagerID;
	}
	public void setManagerID(Long managerID) {
		ManagerID = managerID;
	}
	public UserEntity getUser() {
		return user;
	}
	public void setUser(UserEntity user) {
		this.user = user;
	}
	
	



}
