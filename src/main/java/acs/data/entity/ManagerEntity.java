package acs.data.entity;
import javax.persistence.*;

@Entity
public class ManagerEntity  {
@Id	 @GeneratedValue(strategy=GenerationType.AUTO)
	private String ManagerID;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_email", referencedColumnName = "email", foreignKey=@ForeignKey(name = "fk_manager_email"))
	private UserEntity user; 
	public ManagerEntity() {
		super();
	}
	public String getManagerID() {
		return ManagerID;
	}
	public void setManagerID(String managerID) {
		ManagerID = managerID;
	}
	



}
