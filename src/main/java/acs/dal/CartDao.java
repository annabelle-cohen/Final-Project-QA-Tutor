package acs.dal;

import org.springframework.data.repository.CrudRepository;

import acs.data.entity.CartEntity;




public interface CartDao extends CrudRepository<CartEntity, Long>{



	
}