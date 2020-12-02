package acs.dal;

import org.springframework.data.repository.CrudRepository;

import acs.data.entity.BillingInfoEntity;




public interface  BillingInfoDao extends  CrudRepository<BillingInfoEntity,Long> {

}
