package org.fwoxford.service;

import com.netflix.appinfo.InstanceInfo;
import com.netflix.discovery.EurekaClient;
import com.netflix.discovery.shared.Application;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class EurekaApiService {

    @Autowired
    private EurekaClient discoveryClient;

    public EurekaApiService() {
    }

    public InstanceInfo queryInstanceInfo(String name){
        Application application = discoveryClient.getApplication(name);
        InstanceInfo info = application.getInstances().stream().filter(ins->ins.getStatus().equals(InstanceInfo.InstanceStatus.UP)).findFirst().orElse(null);
        return info;
    }

    public String queryInstanceHomePageUrl(String name){
        InstanceInfo info = queryInstanceInfo(name);
        if (info != null){
            return info.getHomePageUrl();
        }

        return null;
    }
}
