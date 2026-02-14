package com.swaroop.employee_api.service;

import com.swaroop.employee_api.model.Employee;
import com.swaroop.employee_api.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Make sure this is named exactly saveEmployee
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Make sure this is named exactly getAllEmployees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
    // 3. Delete an employee
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    // 4. Update an employee
    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee employee = employeeRepository.findById(id).orElseThrow();
        employee.setName(employeeDetails.getName());
        employee.setEmail(employeeDetails.getEmail());
        employee.setDepartment(employeeDetails.getDepartment());
        return employeeRepository.save(employee);
    }
}