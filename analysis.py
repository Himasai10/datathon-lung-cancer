import json

def calculate_roi(uptake_rate, years=10):
    """
    Simultate ROI for a population of 100,000 eligible (high-risk) adults.
    """
    # Constants based on research
    SCREENING_COST_PER_PERSON = 300
    STAGE_I_COST = 75000
    STAGE_IV_COST = 200000
    
    # Baseline: No screening intervention (High Stage IV rate)
    baseline_stage_i_rate = 0.20
    baseline_stage_iv_rate = 0.80
    
    # Intervention: Screening shifts stages
    # Assume 100% uptake results in 70% Stage I diagnosis
    shift_potential = 0.50 # Potential to shift 50% more to Stage I
    
    total_population = 100000
    screened_population = total_population * uptake_rate
    
    # Total intervention cost
    intervention_cost = screened_population * SCREENING_COST_PER_PERSON
    
    # Calculate cases (approx 1% of high risk eligible will have cancer in LDCT)
    annual_cases = screened_population * 0.01 
    
    # Shifted Cases
    stage_i_cases = annual_cases * (baseline_stage_i_rate + (shift_potential * uptake_rate))
    stage_iv_cases = annual_cases - stage_i_cases
    
    # Cost with Intervention
    cost_with_intervention = (stage_i_cases * STAGE_I_COST) + (stage_iv_cases * STAGE_IV_COST) + intervention_cost
    
    # Cost without Intervention (Baseline)
    cost_baseline = (annual_cases * baseline_stage_i_rate * STAGE_I_COST) + (annual_cases * baseline_stage_iv_rate * STAGE_IV_COST)
    
    net_savings = cost_baseline - cost_with_intervention
    
    # Cumulative over years
    total_savings = net_savings * years
    lives_saved = (annual_cases * 0.5) * uptake_rate * years # Simplified survival delta
    
    return {
        "uptake": uptake_rate,
        "years": years,
        "net_annual_savings": net_savings,
        "total_savings": total_savings,
        "lives_saved": int(lives_saved),
        "investment": intervention_cost
    }

if __name__ == "__main__":
    # Sample run for Philly Point Breeze equivalent population
    result = calculate_roi(0.30, 10) # 30% uptake
    print(json.dumps(result, indent=2))
