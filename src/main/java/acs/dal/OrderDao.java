package acs.dal;

import org.springframework.data.repository.CrudRepository;


import acs.data.entity.OrderEntity;




public interface  OrderDao extends  CrudRepository<OrderEntity,Long> {

}
