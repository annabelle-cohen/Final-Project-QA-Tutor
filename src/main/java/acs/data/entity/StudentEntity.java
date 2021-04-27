
package acs.data.entity;

import javax.persistence.*;

@Entity
public class StudentEntity {
	@Id
	@Column(name = "email")
	private String email;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_email", referencedColumnName = "email", foreignKey = @ForeignKey(name = "fk_manager_email"))
	private UserEntity user;

	public StudentEntity() {
		super();
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

}
