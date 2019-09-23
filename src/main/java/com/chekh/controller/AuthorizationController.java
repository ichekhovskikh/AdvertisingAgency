package com.chekh.controller;

import com.chekh.entity.UserEntity;
import com.chekh.entity.UserRoleEntity;
import com.chekh.repository.UserRepository;
import com.chekh.rest.Request;
import com.chekh.rest.Response;
import com.chekh.rest.SimpleResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/")
public class AuthorizationController {
    private UserRepository repository;

    @Autowired
    public AuthorizationController(UserRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/login")
    public SimpleResponse login(
            @RequestParam(value = "error", required = false) Boolean error,
            @RequestParam(value = "success", required = false) Boolean success
    ) {
        if (error != null && error && success == null) {
            return error();
        } else if (success != null && success && error == null) {
            return success();
        } else if (error == null && success == null) {
            return redirect();
        } else {
            return new SimpleResponse(Response.Status.BAD_REQUEST_ERROR.getCode(), "error");
        }
    }

    @GetMapping("/logout")
    public SimpleResponse logout(@RequestParam(value = "logout", required = false) Boolean logout) {
        if (logout != null && logout) {
            return logout();
        } else {
            return new SimpleResponse(Response.Status.BAD_REQUEST_ERROR.getCode(), "error");
        }
    }

    @PostMapping("/register")
    public SimpleResponse register(@RequestBody Request<UserEntity> request) {
        try {
            UserEntity user = request.getData();
            user.setUserRoleId(UserRoleEntity.Role.USER_ROLE.getId());
            repository.save(user);
            return new SimpleResponse(Response.Status.SUCCESS.getCode());
        } catch (Exception e) {
            return new SimpleResponse(Response.Status.BAD_REQUEST_ERROR.getCode(), e.getMessage());
        }
    }

    private SimpleResponse success() {
        return new SimpleResponse(Response.Status.SUCCESS.getCode(), "success");
    }

    private SimpleResponse redirect() {
        return new SimpleResponse(Response.Status.REDIRECT.getCode(), "login");
    }

    private SimpleResponse error() {
        return new SimpleResponse(Response.Status.UNAUTHORIZED_ERROR.getCode(), "error");
    }

    private SimpleResponse logout() {
        return new SimpleResponse(Response.Status.SUCCESS.getCode(), "logout");
    }
}
