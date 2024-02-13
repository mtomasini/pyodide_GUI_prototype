import numpy as np
import matplotlib.pyplot as plt

time = np.linspace(0, 10, 1000)

def normal_oscillation(frequency, phase_shift):
    trajectory = np.cos(frequency*time - phase_shift)
    
    return trajectory


def damped_oscillation(frequency, phase_shift, damping_coefficient):
    damped_frequency = np.emath.sqrt(damping_coefficient**2 - frequency**2)
    trajectory = np.exp(-damping_coefficient*time)*(np.exp(damped_frequency*time - phase_shift) + np.exp(-damped_frequency*time - phase_shift))
    
    return trajectory


def save_normal_plot(frequency, phase_shift):
    x_t = normal_oscillation(frequency, phase_shift)
    
    plt.figure(figsize=(10, 7))
    plt.plot(time, x_t)
    plt.title(f"freq = {frequency}; phase = {phase_shift}", fontsize = 18)
    plt.suptitle("Harmonic oscillator", fontsize = 20)
    plt.xlabel("time", fontsize=15)
    plt.ylabel("position", fontsize=15)
    plt.grid()
    plt.savefig('./Plots/normal_oscillation.png')
    plt.close()

def save_damped_plot(frequency, phase_shift, damping_coefficient):
    
    x_t = damped_oscillation(frequency, phase_shift, damping_coefficient)
    
    plt.figure(figsize=(10, 7))
    plt.plot(time, x_t)
    plt.title(f"freq = {frequency}; phase = {phase_shift}; damp = {damping_coefficient}", fontsize = 18)
    plt.suptitle("Damped oscillator", fontsize = 20)
    plt.xlabel("time", fontsize=15)
    plt.ylabel("position", fontsize=15)
    plt.grid()
    plt.savefig('./Plots/damped_oscillation.png')
    plt.close()