package acs.dal;

import org.springframework.data.repository.CrudRepository;

import acs.data.entity.OrderDetailsEntity;


public interface  OrderDetailsDao extends  CrudRepository<OrderDetailsEntity,Long> {

}
