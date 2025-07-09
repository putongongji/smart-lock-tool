let currentStep = 1;
let completedSteps = [];
let skippedSteps = [];
let currentLockSN = 'SL2024001234';
let currentDeviceId = 'DEV_ABC123456';
let currentLockModel = '智能锁 Pro Max';
let currentLocation = '朝阳区某小区1-101';
let backupData = null;
let selectedDevice = null;
let isSearching = false;
// 移除换锁历史记录功能

function toggleStep(stepNum) {
    if (stepNum === currentStep || completedSteps.includes(stepNum)) {
        const step = document.getElementById(`step${stepNum}`);
        step.classList.toggle('active');
    }
}

function updateStepStatus(stepNum, status) {
    const step = document.getElementById(`step${stepNum}`);
    const statusElement = step.querySelector('.step-status');
    
    step.classList.remove('active', 'completed', 'skipped');
    
    switch(status) {
        case 'active':
            step.classList.add('active');
            statusElement.textContent = '进行中';
            break;
        case 'completed':
            step.classList.add('completed');
            statusElement.textContent = '已完成';
            break;
        case 'skipped':
            step.classList.add('skipped');
            statusElement.textContent = '已跳过';
            break;
        default:
            statusElement.textContent = '待执行';
    }
}

function moveToNextStep() {
    if (currentStep < 4) {
        currentStep++;
        updateStepStatus(currentStep, 'active');
        
        const nextStepButtons = document.querySelectorAll(`#step${currentStep} button`);
        nextStepButtons.forEach(btn => btn.disabled = false);
    } else {
        // 所有步骤完成，显示完成界面
        showCompletionSection();
    }
}

function showCompletionSection() {
    const completionSection = document.getElementById('completionSection');
    const continueSection = document.getElementById('continueSection');
    
    completionSection.style.display = 'block';
    continueSection.style.display = 'block';
}

// 移除换锁历史记录显示功能

function scanQRCode() {
    const scanBtn = event.target;
    const originalText = scanBtn.innerHTML;
    scanBtn.innerHTML = '<div class="loading"></div>扫描中...';
    scanBtn.disabled = true;
    
    setTimeout(() => {
        const mockSN = 'SL' + Date.now().toString().slice(-6);
        document.getElementById('newLockSerial').value = mockSN;
        scanBtn.innerHTML = originalText;
        scanBtn.disabled = false;
        
        // 显示成功提示
        showAlert('success', '✅ 二维码扫描成功！已获取序列号：' + mockSN);
        
        checkBindRequirements();
    }, 2000);
}

function searchBluetooth() {
    if (isSearching) return;
    
    isSearching = true;
    const searchBtn = event.target;
    const deviceList = document.getElementById('deviceList');
    
    searchBtn.innerHTML = '<div class="loading"></div>搜索中...';
    searchBtn.disabled = true;
    
    deviceList.innerHTML = '';
    deviceList.style.display = 'block';
    
    setTimeout(() => {
        const mockDevices = [
            { name: '小白锁 Pro', id: 'XBL_PRO_001', signal: '-45dBm' },
            { name: '智能门锁 X1', id: 'SDL_X1_002', signal: '-52dBm' },
            { name: '新锁设备', id: 'NEW_LOCK_003', signal: '-38dBm' },
            { name: '蓝牙锁 V2', id: 'BTL_V2_004', signal: '-60dBm' }
        ];
        
        mockDevices.forEach(device => {
            const deviceItem = document.createElement('div');
            deviceItem.className = 'device-item';
            deviceItem.onclick = () => selectDevice(device, deviceItem);
            deviceItem.innerHTML = `
                <div class="device-name">${device.name}</div>
                <div class="device-id">设备ID: ${device.id}</div>
                <div class="device-signal">${device.signal}</div>
            `;
            deviceList.appendChild(deviceItem);
        });
        
        searchBtn.innerHTML = '🔍 重新搜索';
        searchBtn.disabled = false;
        isSearching = false;
    }, 3000);
}

function selectDevice(device, element) {
    document.querySelectorAll('.device-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    element.classList.add('selected');
    selectedDevice = device;
    
    document.getElementById('newDeviceId').value = device.id;
    
    showAlert('info', '✅ 已选择设备：' + device.name);
    
    checkBindRequirements();
}

function checkBindRequirements() {
    const newLockSN = document.getElementById('newLockSerial').value;
    const deviceId = document.getElementById('newDeviceId').value;
    const bindBtn = document.getElementById('bindBtn');
    const manualBindBtn = document.getElementById('manualBindBtn');
    
    if (newLockSN && deviceId) {
        bindBtn.disabled = false;
        manualBindBtn.disabled = false;
    } else {
        bindBtn.disabled = true;
        manualBindBtn.disabled = true;
    }
}

function startBackup() {
    const progressInfo = document.getElementById('backupProgress');
    const progressFill = document.getElementById('backupProgressFill');
    const progressText = document.getElementById('backupProgressText');
    
    progressInfo.style.display = 'block';
    
    const buttons = document.querySelectorAll('#step1 button');
    buttons.forEach(btn => btn.disabled = true);
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressFill.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            
            // 模拟备份数据
            backupData = {
                landlordKeys: 3,
                userKeys: 5,
                adminKeys: 2
            };
            
            progressText.textContent = '✅ 数据备份完成！';
            progressInfo.style.background = 'linear-gradient(135deg, #f0fdf4, #dcfce7)';
            progressInfo.style.borderColor = '#4ade80';
            
            completedSteps.push(1);
            updateStepStatus(1, 'completed');
            moveToNextStep();
        }
    }, 200);
}

function startUnbind() {
    const progressInfo = document.getElementById('unbindProgress');
    const progressFill = document.getElementById('unbindProgressFill');
    const progressText = document.getElementById('unbindProgressText');
    
    progressInfo.style.display = 'block';
    
    const buttons = document.querySelectorAll('#step2 button');
    buttons.forEach(btn => btn.disabled = true);
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 15;
        progressFill.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            
            progressText.textContent = '✅ 旧锁解绑成功！';
            progressInfo.style.background = 'linear-gradient(135deg, #f0fdf4, #dcfce7)';
            progressInfo.style.borderColor = '#4ade80';
            
            completedSteps.push(2);
            updateStepStatus(2, 'completed');
            moveToNextStep();
        }
    }, 150);
}

function startBind() {
    const newLockSN = document.getElementById('newLockSerial').value;
    const deviceId = document.getElementById('newDeviceId').value;
    
    if (!newLockSN || !deviceId) {
        showAlert('warning', '请先扫描二维码获取序列号并搜索蓝牙设备');
        return;
    }
    
    const progressInfo = document.getElementById('bindProgress');
    const progressFill = document.getElementById('bindProgressFill');
    const progressText = document.getElementById('bindProgressText');
    
    progressInfo.style.display = 'block';
    
    const buttons = document.querySelectorAll('#step3 button');
    buttons.forEach(btn => btn.disabled = true);
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 8;
        progressFill.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            
            progressText.textContent = '✅ 新锁绑定成功！';
            progressInfo.style.background = 'linear-gradient(135deg, #f0fdf4, #dcfce7)';
            progressInfo.style.borderColor = '#4ade80';
            
            // 更新当前锁信息
            currentLockSN = newLockSN;
            currentDeviceId = deviceId;
            if (selectedDevice) {
                currentLockModel = selectedDevice.name;
            }
            
            completedSteps.push(3);
            updateStepStatus(3, 'completed');
            moveToNextStep();
        }
    }, 250);
}

function manualBind() {
    showAlert('info', '请按照设备说明书进行手动绑定操作');
}

function startRestore() {
    if (!backupData) {
        showAlert('warning', '没有备份数据可还原');
        return;
    }
    
    const progressInfo = document.getElementById('restoreProgress');
    const progressFill = document.getElementById('restoreProgressFill');
    const progressText = document.getElementById('restoreProgressText');
    const keysSummary = document.getElementById('keysSummary');
    
    progressInfo.style.display = 'block';
    
    const buttons = document.querySelectorAll('#step4 button');
    buttons.forEach(btn => btn.disabled = true);
    
    // 更新还原数据显示
    document.getElementById('restoreLandlordKeys').textContent = backupData.landlordKeys;
    document.getElementById('restoreUserKeys').textContent = backupData.userKeys;
    document.getElementById('restoreAdminKeys').textContent = backupData.adminKeys;
    
    // 执行三个子步骤
    executeRestoreSubSteps(progressFill, progressText, progressInfo, keysSummary);
}

function executeRestoreSubSteps(progressFill, progressText, progressInfo, keysSummary) {
    const subSteps = [
        { name: '领取门锁', duration: 2000, progress: 33 },
        { name: '激活门锁', duration: 2500, progress: 66 },
        { name: '还原钥匙', duration: 2000, progress: 100 }
    ];
    
    let currentSubStep = 0;
    
    // 创建子步骤显示容器
    const subStepsContainer = document.createElement('div');
    subStepsContainer.className = 'sub-steps-container';
    subStepsContainer.innerHTML = `
        <div class="sub-steps-title">还原进度</div>
        <div class="sub-steps-list" id="subStepsList"></div>
    `;
    
    // 插入到进度条之前
    progressInfo.parentNode.insertBefore(subStepsContainer, progressInfo);
    
    const subStepsList = document.getElementById('subStepsList');
    
    // 创建子步骤项
    subSteps.forEach((step, index) => {
        const stepItem = document.createElement('div');
        stepItem.className = 'sub-step-item';
        stepItem.id = `subStep${index}`;
        stepItem.innerHTML = `
            <div class="sub-step-icon">⏳</div>
            <div class="sub-step-text">${step.name}</div>
            <div class="sub-step-status">等待中</div>
        `;
        subStepsList.appendChild(stepItem);
    });
    
    function executeNextSubStep() {
        if (currentSubStep >= subSteps.length) {
            // 所有子步骤完成，显示钥匙摘要
            keysSummary.style.display = 'block';
            
            const totalKeys = backupData.landlordKeys + backupData.userKeys + backupData.adminKeys;
            progressText.textContent = `✅ 数据还原完成！已恢复 ${totalKeys} 个钥匙权限`;
            progressInfo.style.background = 'linear-gradient(135deg, #f0fdf4, #dcfce7)';
            progressInfo.style.borderColor = '#4ade80';
            
            completedSteps.push(4);
            updateStepStatus(4, 'completed');
            moveToNextStep();
            return;
        }
        
        const step = subSteps[currentSubStep];
        const stepElement = document.getElementById(`subStep${currentSubStep}`);
        
        // 更新当前步骤状态
        stepElement.querySelector('.sub-step-icon').textContent = '🔄';
        stepElement.querySelector('.sub-step-status').textContent = '进行中';
        progressText.textContent = `🔄 ${step.name}中...`;
        
        // 动画进度条到当前步骤的进度
        let currentProgress = currentSubStep === 0 ? 0 : subSteps[currentSubStep - 1].progress;
        const targetProgress = step.progress;
        const progressIncrement = (targetProgress - currentProgress) / (step.duration / 50);
        
        const progressInterval = setInterval(() => {
            currentProgress += progressIncrement;
            if (currentProgress >= targetProgress) {
                currentProgress = targetProgress;
                clearInterval(progressInterval);
                
                // 更新步骤为完成状态
                stepElement.querySelector('.sub-step-icon').textContent = '✅';
                stepElement.querySelector('.sub-step-status').textContent = '已完成';
                progressText.textContent = `✅ ${step.name}完成`;
                
                // 等待一下再执行下一步
                setTimeout(() => {
                    currentSubStep++;
                    executeNextSubStep();
                }, 500);
            }
            progressFill.style.width = currentProgress + '%';
        }, 50);
    }
    
    executeNextSubStep();
}

function startNewReplacement() {
    if (confirm('确定要开始新的换锁流程吗？这将重置当前进度并生成新的锁信息。')) {
        // 备注旧锁信息
        const oldLockInfo = {
            serialNumber: currentLockSN,
            deviceId: currentDeviceId,
            model: currentLockModel,
            location: currentLocation,
            replacedAt: new Date().toLocaleString('zh-CN')
        };
        
        // 生成新的锁信息
        currentLockSN = 'SL' + Date.now().toString().slice(-6);
        currentDeviceId = 'DEV_' + Math.random().toString(36).substr(2, 9).toUpperCase();
        currentLockModel = '智能锁 Pro Max';
        currentLocation = '朝阳区某小区1-101';
        
        // 显示旧锁信息备注
        showAlert('success', `旧锁已备注：${oldLockInfo.serialNumber} (${oldLockInfo.replacedAt})`);
        
        // 更新页面显示的当前锁信息
        updateCurrentLockDisplay();
        
        // 重置所有状态
        currentStep = 1;
        completedSteps = [];
        skippedSteps = [];
        backupData = null;
        selectedDevice = null;
        
        // 重置界面
        document.getElementById('completionSection').style.display = 'none';
        document.getElementById('continueSection').style.display = 'none';
        
        // 隐藏钥匙摘要
        const keysSummary = document.getElementById('keysSummary');
        if (keysSummary) {
            keysSummary.style.display = 'none';
        }
        
        // 移除之前创建的子步骤容器
        const existingSubStepsContainer = document.querySelector('.sub-steps-container');
        if (existingSubStepsContainer) {
            existingSubStepsContainer.remove();
        }
        
        // 重置所有步骤状态
        for (let i = 1; i <= 4; i++) {
            updateStepStatus(i, 'pending');
            const progressInfo = document.getElementById(`step${i}Progress`);
            if (progressInfo) {
                progressInfo.style.display = 'none';
            }
            
            // 重置按钮状态
            const buttons = document.querySelectorAll(`#step${i} button`);
            buttons.forEach(btn => {
                btn.disabled = i !== 1;
            });
        }
        
        // 清空输入框
        document.getElementById('newLockSerial').value = '';
        document.getElementById('newDeviceId').value = '';
        document.getElementById('deviceList').style.display = 'none';
        
        // 重置进度条和进度文本
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            bar.style.width = '0%';
        });
        
        // 重置所有进度文本
        const progressTexts = [
            'backupProgressText',
            'unbindProgressText', 
            'bindProgressText',
            'restoreProgressText'
        ];
        progressTexts.forEach(textId => {
            const textElement = document.getElementById(textId);
            if (textElement) {
                textElement.textContent = '';
            }
        });
        
        // 重置进度信息容器的样式
        const progressInfos = document.querySelectorAll('.progress-info');
        progressInfos.forEach(info => {
            info.style.background = '';
            info.style.borderColor = '';
        });
        
        // 设置第一步为活动状态
        updateStepStatus(1, 'active');
        
        showAlert('info', `已开始新的换锁流程，新锁序列号：${currentLockSN}`);
    }
}

function updateCurrentLockDisplay() {
    // 更新当前锁信息显示
    const lockDetails = document.querySelector('.lock-details');
    lockDetails.innerHTML = `
        <div class="detail-row">
            <div class="detail-item">
                <span class="label">序列号:</span>
                <span class="value">${currentLockSN}</span>
            </div>
            <div class="detail-item">
                <span class="label">设备ID:</span>
                <span class="value">${currentDeviceId}</span>
            </div>
        </div>
        <div class="detail-row">
            <div class="detail-item">
                <span class="label">型号:</span>
                <span class="value">${currentLockModel}</span>
            </div>
            <div class="detail-item">
                <span class="label">位置:</span>
                <span class="value">${currentLocation}</span>
            </div>
        </div>
    `;
}

function showAlert(type, message) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.left = '50%';
    alert.style.transform = 'translateX(-50%)';
    alert.style.zIndex = '1001';
    alert.style.maxWidth = '90%';
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    }, 3000);
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 设置初始状态
    updateStepStatus(1, 'active');
    
    // 移除历史记录初始化
    
    // 添加触摸反馈
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        btn.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // 添加步骤卡片点击事件
    for (let i = 1; i <= 4; i++) {
        const stepCard = document.getElementById(`step${i}`);
        const stepHeader = stepCard.querySelector('.step-header');
        
        stepHeader.addEventListener('click', () => {
            if (i === currentStep || completedSteps.includes(i)) {
                stepCard.classList.toggle('active');
            }
        });
    }
});

// 防止页面缩放
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
});

let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);