package com.chekh.controller;

import com.chekh.entity.ContractEntity;
import com.chekh.repository.EntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/contract")
public class ContractController extends AbsController<ContractEntity> {
    private EntityRepository<ContractEntity> repository;

    @Autowired
    public ContractController(EntityRepository<ContractEntity> repository) {
        this.repository = repository;
    }

    @Override
    protected EntityRepository<ContractEntity> getRepository() {
        return repository;
    }
}
