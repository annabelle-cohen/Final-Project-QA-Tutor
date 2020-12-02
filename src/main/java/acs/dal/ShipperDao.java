package acs.dal;

import org.springframework.data.repository.CrudRepository;


import acs.data.entity.ShipperEntity;


public interface  ShipperDao extends  CrudRepository<ShipperEntity,Long> {

}
