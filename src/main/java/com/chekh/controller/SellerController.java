package com.chekh.controller;

import com.chekh.entity.SellerEntity;
import com.chekh.repository.SellerRepository;
import com.chekh.rest.Request;
import com.chekh.rest.Response;
import com.chekh.rest.SimpleResponse;
import com.chekh.util.SortUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/seller")
public class SellerController implements Controller<SellerEntity> {
    public static final String SORT_PROPERTY = "passport.fullName";
    private SellerRepository repository;

    @Autowired
    public SellerController(SellerRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/all")
    public Response<List<SellerEntity>> getAll(
            @RequestParam(value = "sort", required = false) String sort,
            @RequestParam(value = "search", required = false) String search
    ) {
        try {
            Sort.Direction direction = SortUtils.byName(sort);
            return new Response<>(repository.search(search == null ? "" : search, new Sort(direction, SORT_PROPERTY)));
        } catch (Exception e) {
            e.printStackTrace();
            return new Response<>(Response.Status.BAD_REQUEST_ERROR.getCode(), e.getMessage());
        }
    }

    @GetMapping
    public Response<SellerEntity> get(@RequestParam(value = "id") Long id) {
        try {
            return new Response<>(repository.findById(id).orElse(null));
        } catch (Exception e) {
            return new Response<>(Response.Status.BAD_REQUEST_ERROR.getCode(), e.getMessage());
        }
    }

    @PostMapping("/add")
    public SimpleResponse add(@RequestBody Request<SellerEntity> request) {
        try {
            repository.save(request.getData());
            return new SimpleResponse(Response.Status.SUCCESS.getCode());
        } catch (Exception e) {
            return new SimpleResponse(Response.Status.BAD_REQUEST_ERROR.getCode(), e.getMessage());
        }
    }

    @GetMapping("/remove")
    public SimpleResponse remove(@RequestParam(value = "id") Long id) {
        try {
            repository.deleteById(id);
            return new SimpleResponse(Response.Status.SUCCESS.getCode());
        } catch (Exception e) {
            return new SimpleResponse(Response.Status.BAD_REQUEST_ERROR.getCode(), e.getMessage());
        }
    }

    @PostMapping("/update")
    public SimpleResponse update(@RequestBody Request<SellerEntity> request) {
        try {
            repository.save(request.getData());
            return new SimpleResponse(Response.Status.SUCCESS.getCode());
        } catch (Exception e) {
            return new SimpleResponse(Response.Status.BAD_REQUEST_ERROR.getCode(), e.getMessage());
        }
    }
}
