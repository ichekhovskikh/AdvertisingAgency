package com.chekh.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "user_role", schema = "public", catalog = "advertising_agency")
public class UserRoleEntity {
    private Integer userRoleId;
    private String roleName;

    @Id
    @Column(name = "user_role_id", nullable = false)
    public Integer getUserRoleId() {
        return userRoleId;
    }

    public void setUserRoleId(Integer userRoleId) {
        this.userRoleId = userRoleId;
    }

    @Basic
    @Column(name = "role_name", nullable = false, length = -1)
    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserRoleEntity that = (UserRoleEntity) o;
        return Objects.equals(userRoleId, that.userRoleId) && Objects.equals(roleName, that.roleName);
    }

    @Override
    public int hashCode() {
        int result = userRoleId != null ? userRoleId.hashCode() : 0;
        result = 31 * result + (roleName != null ? roleName.hashCode() : 0);
        return result;
    }

    public enum Role {
        USER_ROLE(0, "USER"),
        ADMIN(0, "ADMIN");

        private int id;
        private String name;

        Role(int id, String name) {
            this.id = id;
            this.name = name;
        }

        public int getId() {
            return id;
        }

        public String getName() {
            return name;
        }
    }
}
