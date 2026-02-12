/**
 * Rules for screenshot requirements based on tasks and sub-status.
 * Decoupled to allow easy updates as Google policies change.
 */
export const screenshotRules = {
    // Default rule: 1 screenshots per task unless specified otherwise
    defaultCount: 1,

    // Sub-status specific rules
    subStatusRules: {
        'SO_Implementation_Only': 1, // Only 1 if tag support is active? (Example)
        'SO_Consultation_Only': 2
    },

    // Task specific rules
    taskRules: {
        'tag_installation': 0, // No screenshots if tag is verified
        'troubleshooting': 3   // More screenshots for complex issues
    },

    /**
     * Determines the number of screenshots required.
     * @param {string} subStatus
     * @param {string} taskKey
     * @param {boolean} hasTagSupport
     */
    getRequiredCount(subStatus, taskKey, hasTagSupport) {
        if (hasTagSupport && (taskKey === 'tag_installation' || taskKey === 'setup')) return 0;
        return this.taskRules[taskKey] ?? this.subStatusRules[subStatus] ?? this.defaultCount;
    }
};
