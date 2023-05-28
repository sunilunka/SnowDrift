Vagrant.configure("2") do |config|
    config.vm.box = "generic/ubuntu2204"
    config.vm.boot_timeout = 400
    config.vm.synced_folder ".", "/vagrant"
    config.vm.provision :shell, path: "provision.sh"
    # Need to ensure Vite can hot reload and can view on host
    config.vm.network :private_network, ip: "192.168.56.100"
end
