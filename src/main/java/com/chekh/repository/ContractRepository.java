package com.chekh.repository;

import com.chekh.entity.ContractEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContractRepository extends CrudRepository<ContractEntity, Long> {
    @Query("FROM ContractEntity contact where concat(contact.checkId, '') LIKE concat('%', :checkId, '%')")
    List<ContractEntity> search(@Param("checkId") String search, Sort sort);
}